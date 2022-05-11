const ethers = require("ethers");
require('dotenv').config(); // parse .env file

// this file show how to subscribe to ethereum events.
(async () => {

    const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFRA_KEY}`);

    //// way 1. provider

    // let filters = {
    //     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    //     topics: [
    //         ethers.utils.id("Transfer(address,address,uint256)"),
    //         // ethers.utils.hexZeroPad('0x6bADD0D98bfE8e546DA7a751227fe8D7ab63A808', 32),
    //         // [ethers.utils.hexZeroPad('0x6bADD0D98bfE8e546DA7a751227fe8D7ab63A808', 32), ethers.utils.hexZeroPad('0x6bADD0D98bfE8e546DA7a751227fe8D7ab63A808', 32)] // multi address
    //     ],
    // }
    // provider.once(filters, (log,) => {
    //     log_ = log;
    // });



    //// way 2. contract 

    let abi = [
        "event Transfer(address indexed from, address indexed to, uint256 value)",
        { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" },
    ];


    const contract = new ethers.Contract("0xdac17f958d2ee523a2206206994597c13d831ec7", abi, provider);

    var filter = contract.filters.Transfer();

    contract.once(filter, (_from, _to, _value) => {
        console.log(`_from ${_from} _to ${_to} _value ${_value} `);
    });

    provider.once(filter, (transfer_log,) => {
        // transfer_log
        // {
        //     blockNumber: 14749957,
        //     blockHash: '0xd4670e968401dd90db643b20d0c7763e3c641656dbf7a21368ec926f13a997dd',
        //     transactionIndex: 0,
        //     removed: false,
        //     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        //     data: '0x0000000000000000000000000000000000000000000000000000000077359400',
        //     topics: [
        //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        //       '0x000000000000000000000000e7cb39ce6d0116fabc7ae3833057e5b3fb394d16',
        //       '0x0000000000000000000000000d4a11d5eeaac28ec3f61d100daf4d40471f1852'
        //     ],
        //     transactionHash: '0xfa3e5f8e67a75738f1e04642899ca5ee482ccc05d4be7cf91db0418c358a4b00',
        //     logIndex: 0
        // }

        console.log(contract.interface.decodeEventLog("Transfer", transfer_log.data, transfer_log.topics));
        let decode_transfer_log = contract.interface.decodeEventLog("Transfer", transfer_log.data, transfer_log.topics)
        console.log(`\t Transfer @ block ${transfer_log.blockNumber} from ${decode_transfer_log.from} to ${decode_transfer_log.to} amount ${decode_transfer_log.value}`); // ethers.utils.formatUnits(decode_transfer_log.value, token_decimals)}

    });


})();