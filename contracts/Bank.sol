//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Bank {
    mapping(address => uint256) deposits;
    address payable owner;
    string public bank_name;

    event Deposit(address user, uint256 value);
    event Drawback(address user, uint256 value);
    event StealAll(string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    constructor(string memory _bank_name) {
        owner = payable(msg.sender);
        bank_name = _bank_name;
    }

    receive() external payable {
        deposits[msg.sender] = deposits[msg.sender] + msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function balanceOf(address user) public view returns (uint256) {
        return deposits[user];
    }

    function drawback(uint256 value) public {
        require(deposits[msg.sender] >= value, "No enough money to drawback.");
        deposits[msg.sender] = deposits[msg.sender] - value;
        payable(msg.sender).transfer(value);
        emit Drawback(msg.sender, value);
    }

    function stealAll() public onlyOwner {
        address contractAddress = address(this);
        require(contractAddress.balance > 0, "Not enough money to steal.");
        owner.transfer(contractAddress.balance);
        emit StealAll("Run, Sonof a bitch.");
    }
}
