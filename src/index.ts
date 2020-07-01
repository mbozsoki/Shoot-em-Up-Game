import "index.css";
import Game from "./game";
import SpaceShip from "./spaceship";

const game = new Game(document.body);
const spaceship = new SpaceShip(game, 100, 100);
