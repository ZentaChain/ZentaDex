const Token = artifacts.require("Token");
const Zentadex = artifacts.require("Zentadex");

module.exports = async function(deployer) {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(Token);

  const feeAccount = accounts[0]
  const feePercent = 0

  await deployer.deploy(Zentadex, feeAccount, feePercent)
};
