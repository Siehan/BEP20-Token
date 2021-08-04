// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IBEP20.sol";

/// @title BEP20 Token
/// @author Binance Chain

contract BEP20 is ERC20 {
    constructor(uint256 totalSupply_) ERC20("BEP20", "BEP") {
        _mint(msg.sender, totalSupply_);
    }
}

/*

constructor() public {
    _name = {{TOKEN_NAME}};
    _symbol = {{TOKEN_SYMBOL}};
    _decimals = {{DECIMALS}};
    _totalSupply = {{TOTAL_SUPPLY}};
    _balances[msg.sender] = _totalSupply;

    emit Transfer(address(0), msg.sender, _totalSupply);
  }
*/
