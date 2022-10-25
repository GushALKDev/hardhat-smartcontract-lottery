const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { namedAccounts } = require("../../hardhat.config")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle unit test", function () {
          let raffle, raffleEntraceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntraceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("Works with Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  // Enter the Raffle
                  const startingTimeStamp = await raffle.getLatestTimeStamp()
                  const accounts = await ethers.getSigners()

                  await new Promise(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("Winner Picked event fired!")
                          resolve()
                          try {
                              // Do something here...
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStap = await raffle.getLatestTimeStamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(raffleEntraceFee).toString())
                              assert(endingTimeStap > startingTimeStamp)
                              resolve()
                          } catch (e) {
                              console.log(e)
                              reject(e)
                          }
                      })
                      // Then enter the raffle
                      await raffle.enterRaffle({ value: raffleEntraceFee })
                      const winnerStartingBalance = await accounts[0].getBalance()
                      console.log("RAFFLE ADDRESS:", raffle.address)
                      console.log("RAFFLE ENTRANCE:", ethers.utils.formatEther(raffleEntraceFee))
                      console.log("STARTING BALANCE:", ethers.utils.formatEther(winnerStartingBalance))

                      // and this code WONT complete until our listener has finished listening!
                  })
              })
          })
      })
