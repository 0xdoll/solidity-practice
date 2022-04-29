// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Con1.sol";

contract Con2 {
    function callCon1(address con1_addr) public {
        console.log("Con2 address: ", address(this));
        console.log("Con2 msg.sender: ", msg.sender);
        Con1 con1 = Con1(con1_addr);
        address sayer = con1.say();
        console.log("Con1 response: ", sayer);
    }
}