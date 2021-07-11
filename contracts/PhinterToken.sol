pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract PhinterToken is ERC20, Ownable {
    constructor() ERC20("Phinter", "PHINT") {}

    function mint(address account, uint256 amount) external onlyOwner() {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner() {
        _burn(account, amount);
    }
}
