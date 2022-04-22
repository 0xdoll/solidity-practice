// 0x35D919A43F8A19FA3AA425a498C1a8a8A78c1979

const hre = require("hardhat");

async function main() {

  var contract_addr = "0x755a999ECB0FBA1e3380317b4303D0BdD31DBC35";
  await hre.run("verify:verify", {
    address: contract_addr,
    // constructorArguments: [
    //     "Spam Bank",
    // ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
