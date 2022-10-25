let contractAddress = "0xB29eA9ad260B6DC980513bbA29051570b2115110"
const index = 777
console.log("CONTRACT ADDRESS:", contractAddress)
web3.eth.getStorageAt(contractAddress, 777).then((result) => {
    console.log("RESULT AT MEMORY LOCATION", index.toString(), ":", result)
})
