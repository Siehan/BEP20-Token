/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
const hre = require('hardhat');
const { deployed } = require('./deployed');
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const BEP20 = await hre.ethers.getContractFactory('BEP20');
  const bep20 = await BEP20.deploy();

  await bep20.deployed();
  console.log('bep20 address:', bep20.address);
}
await deployed('BEP20', hre.network.name, bep20.address);

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
