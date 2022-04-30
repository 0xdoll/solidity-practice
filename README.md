# Solidity & Smart Contract practice.

```shell
# start hardhat node with mainnet-forking
npx hardhat node

# deploy contract
npx hardhat run --network localhost scripts/deploy.js

# publish & verify contract
npx hardhat run --network localhost scripts/verify.js

# link remix ide with local path.
remixd -s . -u https://remix.ethereum.org
```
