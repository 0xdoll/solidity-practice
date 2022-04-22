// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory is SimpleStorage {

    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorage() public {
        simpleStorageArray.push(new SimpleStorage());
    }

    function sfStoreNumber(uint256 _ssIdx, uint256 _favoriteNumber) public {
        SimpleStorage simpleStorage = SimpleStorage(address(simpleStorageArray[_ssIdx]));
        simpleStorage.storeNumber(_favoriteNumber);
    }

    function sfGetNumber(uint256 _ssIdx) public view returns (uint256) {
        SimpleStorage simpleStorage = SimpleStorage(address(simpleStorageArray[_ssIdx]));
        return simpleStorage.favoriteNumber();
    }
}