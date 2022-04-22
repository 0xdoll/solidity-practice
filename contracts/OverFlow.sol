// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract OverFlow {

    function divclip() public pure returns (uint256) {
        uint256 x = 998;
        return x/3;
    }

    function overflow() public pure returns (uint8) {
        unchecked{ // below 0.8
            return uint8(255 + uint8(2));
        }
        
    }

}