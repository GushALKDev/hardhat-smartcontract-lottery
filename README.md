# INICIALIZE THE PROJECT

    yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv

# Declare requires in hardhat.config.js

    require("@nomiclabs/hardhat-waffle")
    require("@nomiclabs/hardhat-etherscan")
    require("hardhat-deploy")
    require("solidity-coverage")
    require("hardhat-gas-reporter")
    require("hardhat-contract-sizer")
    require("dotenv").config()

# Install Hardhat shorthand

    yarn global add hardhat-shorthand --> "hh" is now the same than "yarn hardhat"
