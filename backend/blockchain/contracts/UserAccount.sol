/*
 * Filename: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts\UserAccount.sol
 * Path: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts
 * Created Date: Monday, January 13th 2025, 10:15:03 pm
 * Author: Christian Bannard
 * 
 * Copyright (c) 2025 Christian Bannard
 */


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./GINToken.sol";

contract UserAccount is Ownable {
    GINToken public ginToken;
    
    struct User {
        bool isRegistered;
        bool isContributor;
        uint256 contributionScore;
        uint256 tokenBalance;
    }
    
    mapping(address => User) public users;
    
    event UserRegistered(address indexed userAddress, bool isContributor);
    event ContributionScoreUpdated(address indexed contributor, uint256 newScore);
    
    constructor(address _ginToken) Ownable(msg.sender) {
        ginToken = GINToken(_ginToken);
    }
    
    function registerUser(address userAddress, bool isContributor) public onlyOwner {
        require(!users[userAddress].isRegistered, "User already registered");
        
        users[userAddress] = User({
            isRegistered: true,
            isContributor: isContributor,
            contributionScore: 0,
            tokenBalance: 0
        });
        
        emit UserRegistered(userAddress, isContributor);
    }
    
    function updateContributionScore(address contributor, uint256 newScore) public onlyOwner {
        require(users[contributor].isRegistered, "User not registered");
        require(users[contributor].isContributor, "Not a contributor");
        
        users[contributor].contributionScore = newScore;
        emit ContributionScoreUpdated(contributor, newScore);
    }
}