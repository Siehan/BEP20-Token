const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('BEP20 Token', async function() {
  let BEP20, bep20, dev, owner, charlie;
  const TOKEN_NAME = 'BEP20';
  const TOKEN_SYMBOL = 'BEP';
  const INITIAL_SUPPLY = '1000000';
  const TOTAL_SUPPLY = ethers.utils.parseEther('1000000000000000000');
  const ZERO_ADDRESS = ethers.constants.AddressZero;

  beforeEach(async function() {
    [dev, owner] = await ethers.getSigners();
    BEP20 = await ethers.getContractFactory(TOKEN_NAME);
    bep20 = await BEP20.connect(owner).deploy(owner.address, INITIAL_SUPPLY);
    await bep20.deployed();
  });

  describe('Deployment', function() {
    it(`Should have name: ${TOKEN_NAME}`, async function() {
      expect(await bep20.name()).to.equal(TOKEN_NAME);
    });

    it(`Should have symbol ${TOKEN_SYMBOL}`, async function() {
      expect(await bep20.symbol()).to.equal(TOKEN_SYMBOL);
    });

    describe('Token transfer', function() {
      it('should emit a transfer event', async function() {
        await expect(bep20.deployTransaction)
          .to.emit(bep20, 'Transfer')
          .withArgs(ZERO_ADDRESS, owner.address, TOTAL_SUPPLY);
      });

      it('Should transfer the total supply to owner', async function() {
        let bep20 = await BEP20.connect(dev).deploy(owner.address, TOTAL_SUPPLY);
        expect(await bep20.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
      });

      it('Should emits event Transfer when mint initial supply to owner at deployement', async function() {
        const receipt = await bep20.deployTransaction.wait();
        const txHash = receipt.transactionHash;
        await expect(txHash)
          .to.emit(bep20, 'Transfer')
          .withArgs(ethers.constants.AddressZero, owner.address, INITIAL_SUPPLY);
      });

      it('Should transfer tokens from sender to recipient', async function() {
        await expect(bep20.transfer).to.be.revertedWith('There is not enough funds to transfer');
      });

      describe('Token transferFrom', function() {
        it('Should transferFrom tokens from sender to recipient', async function() {
          await expect(bep20.transfer(charlie.address, TOTAL_SUPPLY)).to.be.revertedWith(
            'There is not enough funds to transfer'
          );
        });
      });
    });
  });
});
