const crypto = require('crypto')
const SHA256 = message => crypto.createHash("sha256").update(message).digest("hex")

class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp
        this.data = data
        this.hash = this.getHash()
        this.prevHash = ""
        this.nonce = 0
    }

    getHash() {
        return SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash + this.nonce)
    }

    mine(difficulty){
        while(!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash()
        }
    }
}

class BlockChain{
    constructor(){
        this.chain = [new Block(Date.now().toString())]
        this.difficulty = 1
        this.blockTime = 30
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(block){
        block.prevHash = this.getLastBlock().hash
        block.hash = block.getHash()
        block.mine(this.difficulty)
        this.chain.push(block)
        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1: -1
    }

    isValid(blockchain = this){
        for(let i = 1; i < blockchain.length; i++)
        {
            const block = blockchain.chain[i]
            const prevblock = blockchain.chain[i-1]
            if(block.hash !== block.getHash() || prevblock.hash !== block.prevHash)
            {
                return false
            }
        }
        return true
    }
}

const jeChain = new BlockChain();
jeChain.addBlock(new Block(Date.now().toString()), ["Hello", "World"])
jeChain.addBlock(new Block(Date.now().toString()), ["Hello", "Wold"])
jeChain.addBlock(new Block(Date.now().toString()), ["Hello", "Wrld"])
jeChain.addBlock(new Block(Date.now().toString()), ["Hello", "Wrld"])
jeChain.addBlock(new Block(Date.now().toString()), ["Hello", "Wrld"])
jeChain.addBlock(new Block(Date.now().toString()), ["Hello", "Wrld"])
console.log(jeChain.chain)
console.log(jeChain.difficulty)