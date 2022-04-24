import Web3 from "web3"

const RPC_HOST = 'https://mainnet.infura.io/v3/0df32182ab6a4411ab3c89686e39125e'
const ROLLBOTS_ADDRESS = '0x2f102E69cbcE4938CF7fB27ADb40fAd097A13668'


async function main() {
    const web3 = new Web3(RPC_HOST)

    web3.eth.getPastLogs({
        fromBlock: 13400000,
        toBlock: 'latest',
        address: ROLLBOTS_ADDRESS,
        topics:['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
    })
    .then(function(events) {
        events.forEach(event => {
            let from = event.topics[1].slice(0, 2) + event.topics[1].slice(26)
            let to = event.topics[2].slice(0, 2) + event.topics[2].slice(26)
            let tokenID = web3.utils.hexToNumber(event.topics[3])

            console.log(`Rollbot NFT ${tokenID} transferred ${from} -> ${to}, Txn Hash: ${event.transactionHash}`)
        });
    })
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})