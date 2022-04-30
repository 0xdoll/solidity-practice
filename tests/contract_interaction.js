
const { ethers } = require("ethers");
require('dotenv').config();

(async () => {

    // // npx hardhat run test/td.js --network 
    // ethers.getDefaultProvider()
    // var signer = (await ethers.getSigners())[0]; // first signer.
    // // signer.provider = new ethers.providers.JsonRpcProvider(); // for node cli, remove if no need.


    const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${process.env.INFRA_KEY}`);
    var contract_addr = "0xB33b0d4798840C138d9ABc64A8fBef2f3dc6d30A";
    var account0 = new ethers.Wallet(process.env.ETH_ACCOUNT_PK, provider)
    var account1 = new ethers.Wallet(process.env.ETH_ACCOUNT_PK1, provider)

    const contract_abi = `[{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sayer","type":"address"},{"indexed":false,"internalType":"string","name":"content","type":"string"}],"name":"SayWords","type":"event"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_words","type":"string"}],"name":"saySome","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"}]`;
    var helloerContract = new ethers.Contract(contract_addr, contract_abi, account0);

    // const contractWithSigner = helloerContract.connect(signer);

    // await helloerContract.greet()
    // await helloerContract.greet()
    var saytx = await helloerContract.saySome("joker");

    await saytx.wait();

})();