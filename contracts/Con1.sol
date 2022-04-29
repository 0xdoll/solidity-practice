// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Con1 {
    function say() public view returns (address) {
        console.log("Con1.say: msg.sender -> ", msg.sender);
        return msg.sender;
    }
}