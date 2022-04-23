// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Constants {
    
    function show() public view returns (uint256) {
        return block.timestamp;
    }
}