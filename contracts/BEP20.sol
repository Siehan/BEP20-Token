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
