const HDWAlletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWAlletProvider(
    'question help below top weird emotion nation material robust lion can shop',
    'https://rinkeby.infura.io/v3/8b697d5d92fe408982405aa1b617417b'
);

const web3 = new Web3(provider);

//just to use async/await syntax
const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });

    console.log(result.options.address);
}

deploy();