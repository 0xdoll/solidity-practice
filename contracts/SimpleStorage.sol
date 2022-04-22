// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SimpleStorage {
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    uint256 public favoriteNumber;
    mapping(address => People) public peoples;

    function store(string memory _name, uint256 _favoriteNumber) public {
        peoples[msg.sender] = People({name: _name, favoriteNumber: _favoriteNumber}); // People(_favoriteNumber, name);
        console.log("Nope, favoriteNumber Set to ", _favoriteNumber);
    }

    function retrieve() public view returns (uint256) {
        return peoples[msg.sender].favoriteNumber;
    }

    function storeNumber(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }
}
