// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// https://eips.ethereum.org/EIPS/eip-20
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol

contract Token0xDoller is ERC20 {
    constructor(uint256 initialSupply) ERC20("Doll Coin", "$DC") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 5;
    }
}