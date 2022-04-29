
require('dotenv').config();

const { ethers } = require("ethers");

(async () => {

    const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALECHEMY_MAINNET_KEY}`); // `https://mainnet.infura.io/v3/${process.env.INFRA_KEY}`);

    //// query logs, limit to some range of blocks. & need to parse data by your self. (cannot specify event parameters)
    var logs = await provider.getLogs({
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        fromBlock: 14653897,
        toBlock: 14654897,
        topics: [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        ],
    });
    // {
    //     blockNumber: 14653897,
    //     blockHash: '0xadc65736d39dc7adade1a7844c8119b2597fa7f0b6461991ba6f80a14d624129',
    //     transactionIndex: 13,
    //     removed: false,
    //     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    //     data: '0x000000000000000000000000000000000000000000000000000000005b042bc0',
    //     topics: [
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       '0x000000000000000000000000e4b6300b39a3a25872b76f90499d0e45efcacb32',
    //       '0x0000000000000000000000004b45cc53add1fb57c6d5d36679cc11d85b0a5e69'
    //     ],
    //     transactionHash: '0x6970d21c82d676b355a389b5e4894a20e82d592ea8f3bf6b14263959021e762c',
    //     logIndex: 40
    //   }


    // // query events by a contract & support filter by event parameters.
    abi = [
        "event Transfer(address indexed src, address indexed dst, uint256 val)"
    ];
    const contract = new ethers.Contract("0xdac17f958d2ee523a2206206994597c13d831ec7", abi, provider);
    var events = await contract.queryFilter(contract.filters.Transfer("0xda7c0f14572ef5919dcaa2fe89558b130eb14f3d"))
    // {
    //     blockNumber: 14632821,
    //     blockHash: '0x1e72c908648b6b38d0876e1170f69147ded1ae230cbdfa823e215080fbc2e9e1',
    //     transactionIndex: 114,
    //     removed: false,
    //     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    //     data: '0x000000000000000000000000000000000000000000000000000000008bb749c8',
    //     topics: [
    //       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //       '0x000000000000000000000000da7c0f14572ef5919dcaa2fe89558b130eb14f3d',
    //       '0x000000000000000000000000e104f8f38b714ed2bda2521f84795851b0c02d38'
    //     ],
    //     transactionHash: '0xe97b7b4526f5f6ad72a60164114fff02b8bdd5b5f84d3c648c35cdfbc4426627',
    //     logIndex: 238,
    //     removeListener: [Function (anonymous)],
    //     getBlock: [Function (anonymous)],
    //     getTransaction: [Function (anonymous)],
    //     getTransactionReceipt: [Function (anonymous)],
    //     event: 'Transfer',
    //     eventSignature: 'Transfer(address,address,uint256)',
    //     decode: [Function (anonymous)],
    //     args: [
    //       '0xDa7c0F14572eF5919dCaa2FE89558b130eB14F3D',
    //       '0xe104f8F38B714Ed2Bda2521f84795851B0c02d38',
    //       BigNumber { _hex: '0x8bb749c8', _isBigNumber: true },
    //       src: '0xDa7c0F14572eF5919dCaa2FE89558b130eB14F3D',
    //       dst: '0xe104f8F38B714Ed2Bda2521f84795851B0c02d38',
    //       val: BigNumber { _hex: '0x8bb749c8', _isBigNumber: true }
    //     ]
    //   }

    // query all NFT
    // curl --header "X-API-KEY: OPENSEA_APYKEY " --request GET -i --url 'https://api.opensea.io/api/v1/assets'


})();