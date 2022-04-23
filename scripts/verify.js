
const hre = require("hardhat");

async function main() {

  var contract_addr = "0xc915c1E28f9CD37b9EF1376bF7bc805B01E71f28";
  await hre.run("verify:verify", {
    address: contract_addr,
    constructorArguments: [
      "0xBFB9F99291cA3f040A1317ae835C7071Cf2432d0",
      "0x7661F8e62658A42169f25DD6b3C58263726e9b4b",
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
      1,
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
