// http://remix.ethereum.org
pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    address public sender;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
        sender = msg.sender;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function getMessage() public view returns(string) {
        return message;
    }
}
