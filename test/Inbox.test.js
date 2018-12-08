const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const initialMessage = 'Hi there!';

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [initialMessage] })
        .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider);

});

describe("Inbox", ()=> {
    
    it("deploy contract", ()=>{
        assert.ok(inbox.options.address);
    });

    it("sets default message", async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    });

    it("update message", async ()=>{
        const newMessage = "New message";
        await inbox.methods.setMessage(newMessage).send({from: accounts[0], gas: '1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);
    });
   
});