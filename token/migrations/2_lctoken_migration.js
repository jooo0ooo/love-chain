const LoveToken = artifacts.require("./Love");

module.exports = function (deployer) {
  deployer.deploy(LoveToken);
};
