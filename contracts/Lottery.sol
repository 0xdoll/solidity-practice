// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

// Smart Contract based Lottery program. Rules:
// 1. Users can enter lottery with ETH based on a USD fee.
// 2. An admin will choose when the lottery is over.
// 3. The lottery will select a random winner.

abstract contract VRFv2Consumer is VRFConsumerBaseV2, Ownable {
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 public s_subscriptionId;
    // Rinkeby coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations

    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;
    bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;
    uint32 callbackGasLimit = 1000000;
    uint16 requestConfirmations = 3;
    uint32 numWords =  1;

    uint256 public s_randomWord;
    uint256 public s_requestId;
    address s_owner;

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
    }

    function requestRandomWords() internal onlyOwner {
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

}

contract Lottery is Ownable, VRFv2Consumer {

    AggregatorV3Interface priceFeed;
    address payable[] public players;
    mapping(uint256 => mapping(address => bool)) public roundEnteredPlayes;
    address payable public lastWinner;
    uint256 entryFee; // dollar * 10**8
    uint256 public roundId;

    enum LOTTERY_STATE {
        OPEN,
        CLOSED,
        CALCULATING_WINNER
    }

    LOTTERY_STATE public lotteryState;

    constructor(uint64 _subscriptionId) VRFv2Consumer(_subscriptionId) {
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e); // ChainLink ETH/USD feed rinkeby.
        entryFee = 50 * 10**8;
        lotteryState = LOTTERY_STATE.CLOSED;
        roundId = 0;
    }

    function enter() public payable  {
        require( lotteryState == LOTTERY_STATE.OPEN, "Lottery has not started!");
        require( roundEnteredPlayes[roundId][msg.sender] == false, "You Has entered!!!");
        require( (msg.value * getETHPrice()) > (entryFee * 10**18), "You need more money to enter lottery!" );
        roundEnteredPlayes[roundId][msg.sender] = true;
        players.push(payable(msg.sender));
    }

    function getEntryFee() public view returns (uint256) {
        return entryFee;
    }

    function setEntryFee(uint256 _entryFee) public onlyOwner {
        entryFee = _entryFee;
    }

    function startLottery() public onlyOwner {
        lotteryState = LOTTERY_STATE.OPEN;
    }

    function endLottery() public onlyOwner {
        require( lotteryState == LOTTERY_STATE.OPEN, "Lottery has not started!");
        lotteryState = LOTTERY_STATE.CALCULATING_WINNER;
        requestRandomWords();
    }

    function getETHPrice() internal view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer);
    }

    function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
        s_randomWord = randomWords[0];

        require(s_randomWord > 0, "we need s_randomWord > 0!");
        require(lotteryState == LOTTERY_STATE.CALCULATING_WINNER, "Lottery should be calculating!");

        lastWinner = players[s_randomWord % players.length];
        lastWinner.transfer(address(this).balance);

        // reset
        // for (uint256 idx = 0; idx < players.length; idx++) {
        //     enteredPlayes[players[idx]] = false;
        // }
        roundId += 1;
        players = new address payable[](0);
        lotteryState = LOTTERY_STATE.CLOSED;

    }

}