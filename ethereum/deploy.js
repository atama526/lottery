const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider('fee arrow song boost language goat silk symptom bracket empower honey little', 
  'https://rinkeby.infura.io/v3/3d3fa5b43f744e6586b6a91e71ef553a'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  console.log("this is the ABI that is needed for the front end", interface);
  provider.engine.stop();


};
deploy();
