const { run } = require("hardhat")

// For verify (publish) automatically a contract in the blockchain explorer
async function verify(contractAddress, args) {
    console.log("Veryfing contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.loLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else console.log(e.message)
    }
}

module.exports = { verify }
