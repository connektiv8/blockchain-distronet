/*
 * Filename: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts\TokenExchange.sol
 * Path: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts
 * Created Date: Monday, January 13th 2025, 10:14:41 pm
 * Author: Christian Bannard
 * 
 * Copyright (c) 2025 Christian Bannard
 */


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenExchange is Ownable {
    IERC20 public ginToken;
    AggregatorV3Interface public ethUsdPriceFeed;
    
    uint256 public constant GIN_TO_USD = 1 * 10**16; // 0.01 USD per GIN
    
    event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);
    event TokensSold(address indexed seller, uint256 tokenAmount, uint256 ethAmount);
    
    constructor(
        address _ginToken,
        address _priceFeed
    ) Ownable(msg.sender) {
        ginToken = IERC20(_ginToken);
        ethUsdPriceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    function getEthUsdPrice() public view returns (uint256) {
        (, int price,,,) = ethUsdPriceFeed.latestRoundData();
        return uint256(price);
    }
    
    function calculateTokenAmount(uint256 ethAmount) public view returns (uint256) {
        uint256 ethUsdPrice = getEthUsdPrice();
        uint256 ethValueInUsd = (ethAmount * ethUsdPrice) / 10**18;
        return (ethValueInUsd * 10**18) / GIN_TO_USD;
    }
    
    function buyTokens() public payable {
        require(msg.value > 0, "Must send ETH");
        uint256 tokenAmount = calculateTokenAmount(msg.value);
        require(ginToken.balanceOf(address(this)) >= tokenAmount, "Insufficient token liquidity");
        
        ginToken.transfer(msg.sender, tokenAmount);
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }
    
    function sellTokens(uint256 tokenAmount) public {
        require(tokenAmount > 0, "Must sell some tokens");
        require(ginToken.balanceOf(msg.sender) >= tokenAmount, "Insufficient token balance");
        
        uint256 ethAmount = (tokenAmount * GIN_TO_USD) / getEthUsdPrice();
        require(address(this).balance >= ethAmount, "Insufficient ETH liquidity");
        
        require(ginToken.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");
        payable(msg.sender).transfer(ethAmount);
        
        emit TokensSold(msg.sender, tokenAmount, ethAmount);
    }
    
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function withdrawTokens(uint256 amount) public onlyOwner {
        ginToken.transfer(owner(), amount);
    }
    
    receive() external payable {}
}