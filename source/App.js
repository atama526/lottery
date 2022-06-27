import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
import { Header, Segment, Button, Step, Card, Grid } from 'semantic-ui-react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      manager: "",
      balance: "",
      value:"",
      message:"",
      playersCount:""
    };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.players(0).call()
    const balance = await web3.eth.getBalance(lottery.options.address);
    
    console.log(players)


    this.setState({ manager, balance });
  }

  modifyAddress = (address) => {
   return (`${address.slice(0,5)}...${address.slice(address.length-4)}`
  )}

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message:'Currently processing transaction...'})

    await lottery.methods.addUser().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message:"You have entered the lottery"});

  };

  selectWinner = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Choosing a winner...'})

    await lottery.methods.winLottery().send({
      from: accounts[0]
    })
    this.setState({message:'Congratulations to the winner' })
    
  }

  

  render() {
    return (
      <div>
        <div>
          <div className="title1"> 
            <Header className='title' as='h1' attached='top' color='blue'>Lottery Contract</Header>
          </div>
            <Segment className='segment1' atached>
              <h3>This is an Lottery based on Ethereum Network, it is run by a Smart Contract and it uses Ether to enter  
              </h3>
            </Segment>
        </div>

        <div className="segment1">
          <Segment.Group compact>
            <Segment inverted color='blue' >
              <h3>This contract is managed by the user with wallet address: {this.modifyAddress(this.state.manager)} </h3>
            </Segment>
                
            <Segment className='segment1'> 
              <h3> This lottery´s big pot is {web3.utils.fromWei(this.state.balance,'ether')} ether! </h3>
            </Segment>
          </Segment.Group>
        </div>

        <div className="container">
          <div>
            <Card>
              <Card.Content textAlign='center'>
                <form onSubmit={this.onSubmit}>
                  <Card.Header>
                    <h2> Feeling lucky? </h2>
                  </Card.Header>
                    
                  <div> 
                    <label> <h4> Write the amount of ether to enter the lottery</h4> </label>
                      <input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}

                      />
                  </div>
                    
                  <Button className='button' primary> Submit </Button>
                </form>
              </Card.Content>
            </Card>
          </div>
           

          <div className="content">
            <Card>
              <Card.Content textAlign='center'>
                <Card.Header content= 'Please select a winner! ' />
                <Button className="button" primary onClick ={this.selectWinner}> Select </Button> 
              </Card.Content>
            </Card>
          </div>

        </div>
              
              <h2>
                {this.state.message}
              </h2>
           
      </div>
    );
  }
}
export default App;
