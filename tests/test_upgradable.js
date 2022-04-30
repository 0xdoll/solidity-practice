
const { ethers } = require("ethers");
require('dotenv').config();
const hre = require("hardhat");

// npx hardhat run tests/test_upgradable.js --network rinkeby

(async () => {

    // await hre.run('compile');

    const Box = await hre.ethers.getContractFactory("Box");
    const box = await Box.deploy();
    await box.deployed();
    console.log(`box v1 deploy to ${box.address}`);

    setTimeout(async () => {
        await hre.run("verify:verify", {
            address: box.address,
        });
    }, 10000);

    const TransparentUpgradeableProxy = await hre.ethers.getContractFactory("TransparentUpgradeableProxy");
    const transparentUpgradeableProxy = await TransparentUpgradeableProxy.deploy(box.address, "0x9147415daC1BD01676239F5F252596E4b61785a4", '0x');
    await transparentUpgradeableProxy.deployed();
    console.log(`transparentUpgradeableProxy deploy to ${transparentUpgradeableProxy.address}`);

    setTimeout(async () => {
        await hre.run("verify:verify", {
            address: transparentUpgradeableProxy.address,
            constructorArguments: [
                box.address, "0x9147415daC1BD01676239F5F252596E4b61785a4", '0x'
            ],
        });
    }, 10000);

    const BoxV2 = await hre.ethers.getContractFactory("BoxV2");
    const boxV2 = await BoxV2.deploy();
    await boxV2.deployed();
    console.log(`box v2 deploy to ${boxV2.address}`);

    setTimeout(async () => {
        await hre.run("verify:verify", {
            address: boxV2.address,
        });
    }, 10000);

    // ropsten 
    // box v1 0x10Cb0E04D4e1Fc1c1b9E6552D82859dc2Fcf869b
    // prxoy 0xe416075EC2077BeceEb96DC8532419DEec30817d
    // box v2 0xb09B3E7452dE05E7509e1E7Ef7040F703aED4115

    // rinkeby
    // box v1 0x3a771cA453a610464a441aeB97c9e66dBF4d9a64
    // proxy 0xC5549f932eE5707BF3500C76Cf88eEdd79223786
    // box v2 0xF82980B74E6dCbd16cB836F31636b3AD7e195e01

    var signer = (await hre.ethers.getSigners())[0]; // first signer.
    const ProxyArtifact = await hre.artifacts.readArtifact("TransparentUpgradeableProxy");
    var proxy = new hre.ethers.Contract("0xe416075EC2077BeceEb96DC8532419DEec30817d", ProxyArtifact.abi, signer);
    var tx = await proxy.upgradeTo("0xb09B3E7452dE05E7509e1E7Ef7040F703aED4115");
    await tx.wait(1);
    console.log(`upgradeTo tx -> ${JSON.stringify(tx)}`);

    var signer = (await hre.ethers.getSigners())[1]; // first signer.
    const BoxV2Artifact = await hre.artifacts.readArtifact("BoxV2");
    var proxy = new hre.ethers.Contract("0xe416075EC2077BeceEb96DC8532419DEec30817d", BoxV2Artifact.abi, signer);

    var tx = await proxy.addCoin(18);
    console.log(`proxy.addCoin tx -> ${JSON.stringify(tx)}`);
    await tx.wait();

})();