// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import 'openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Pausable.sol';
import 'openzeppelin-solidity/contracts/access/Ownable.sol';
import './TokenLock.sol';

contract Love is ERC20Pausable, Ownable {
	uint public constant INITIAL_SUPPLY = 100000000000 * (10 ** 18);
	
	 // Lock
  	mapping (address => address) public lockStatus;
  	event Lock(address _receiver, uint256 _amount);

	// Airdrop
	mapping(address => uint256) public airDropHistory;
	event AirDrop(address _receiver, uint256 _amount);
	
	constructor() ERC20("Love", "LV")  {
		_mint(msg.sender, INITIAL_SUPPLY);
	}

	function dropToken(address[] memory receivers, uint256[] memory values) public {
		require(receivers.length != 0);
		require(receivers.length == values.length);

		for (uint256 i = 0; i < receivers.length; i++) {
			address receiver = receivers[i];
			uint256 amount = values[i];

			transfer(receiver, amount);
			airDropHistory[receiver] += amount;

			emit AirDrop(receiver, amount);
		}
	}

	function lockToken(address beneficiary, uint256 amount, uint256 releaseTime, bool isOwnable) onlyOwner public {
		TokenLock lockContract = new TokenLock(this, beneficiary, msg.sender, releaseTime, isOwnable);

		transfer(address(lockContract), amount);
		lockStatus[beneficiary] = address(lockContract);
		emit Lock(beneficiary, amount);
  	}
}