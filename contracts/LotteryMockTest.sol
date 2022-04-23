// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./chainlink_mock/VRFCoordinatorV2Mock.sol";
import "./chainlink_mock/MockV3Aggregator.sol";
import "./Lottery.sol";

contract LotteryMockTest {

    MockV3Aggregator public mockV3Aggregator;
    VRFCoordinatorV2Mock public vRFCoordinatorV2Mock;
    Lottery public lottery;

    constructor() {
        console.log("LotteryMockTest address: ", address(this));
        mockV3Aggregator = new MockV3Aggregator(8, 3000*10**8);
        console.log("mockV3Aggregator address: ", address(mockV3Aggregator));
        vRFCoordinatorV2Mock = new VRFCoordinatorV2Mock(10**8, 10**8);
        console.log("vRFCoordinatorV2Mock address: ", address(vRFCoordinatorV2Mock));

        uint64 subId = vRFCoordinatorV2Mock.createSubscription();
        console.log("subId :", subId);
        vRFCoordinatorV2Mock.fundSubscription(subId, 10**23);
        lottery = new Lottery(address(mockV3Aggregator), address(vRFCoordinatorV2Mock), 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc, subId);
        console.log("lottery address: ", address(lottery));
        lottery.transferOwnership(msg.sender);

    }
}