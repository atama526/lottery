pragma solidity ^0.4.17;

contract Lottery {
    
    //Declaration of variables. The pot and an object of players
    address[] public players;
    address public manager;
    uint aux = 0;
    uint public index = 0;
    address public winner;
    
    
    modifier onlyAgent() {
        require(msg.sender == manager);
        _; 
    }
    //Declaration of functions. One to add a user and the second one to Win the lottery

    constructor() public  {
        manager = msg.sender;
    }
    function _random() private view returns(uint) {
        uint _randomNum = uint(keccak256(abi.encodePacked(now, players)));
        return _randomNum % players.length;
    }
    
    function addUser() public payable returns(address[]) {
        
        players.push(msg.sender);
        return players;

    }

    function winLottery() public onlyAgent returns(address) {
        index = _random();
        players[index].transfer(address(this).balance);
        winner = players[index];
        players = new address[](0);
        return winner;

    } 
   


}
