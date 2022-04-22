// 0x35D919A43F8A19FA3AA425a498C1a8a8A78c1979

const hre = require("hardhat");

async function main() {

  var contract_addr = "0x7c8c43fbb3406380777fa92e4ded18c0718d4ab5";
  await hre.run("verify:verify", {
    address: contract_addr,
    constructorArguments: [
      3240,
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
