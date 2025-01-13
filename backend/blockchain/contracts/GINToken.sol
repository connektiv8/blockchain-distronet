/*
 * Filename: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts\GINToken.sol
 * Path: c:\localdev\crypto\blockchain-distronet\backend\blockchain\contracts
 * Created Date: Monday, January 13th 2025, 10:13:44 pm
 * Author: Christian Bannard
 * 
 * Copyright (c) 2025 Christian Bannard
 */





// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GINToken is ERC20, Ownable, Pausable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million tokens
    
    constructor() ERC20("GinkyAI", "GIN") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
    
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}