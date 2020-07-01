import * as PIXI from "pixi.js";
import Game from "./game";
import SpaceshipImage from './assets/sprites/spaceship.png'

export default class SpaceShip {
  private game: Game;
  private body: PIXI.Sprite;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.body = PIXI.Sprite.from(SpaceshipImage);
    this.body.position.x = x;
    this.body.position.y = y;
    this.body.anchor.x = 0.5;
    this.body.anchor.y = 0.5;
    this.body.width = 70;
    this.body.height = 100;
    this.game.stage.addChild(this.body);
  }
}
