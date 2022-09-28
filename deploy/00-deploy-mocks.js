const { LogDescription } = require("ethers/lib/utils")
const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 LINK per request
    const GAS_PRICE_LINK = 1e9 // Calculated value based on the gas price of the chain.
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected, deploying mocks...")
        // deploy a mock vrfCoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mock deployed!!")
        log("----------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
