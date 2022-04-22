const hre = require("hardhat");

async function main() {
  // await hre.run('compile');

  const Contract = await hre.ethers.getContractFactory("FundMe");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(`contract deploy to ${contract.address}`);
  // await hre.run("verify:verify", {
  //   address: contract.address,
  //   // constructorArguments: [
  //   //     "Hello, Shuge!",
  //   // ],
  // });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
