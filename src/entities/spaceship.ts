import * as PIXI from "pixi.js";
import SpaceshipImage from "../assets/sprites/spaceship.gif";
import ExplosionImage from "../assets/sprites/explosion.png";
import GameSprite from "./game-sprite";

export default class SpaceShip extends GameSprite {
  private _isDead = false;
  private _explosionTexture = PIXI.Texture.from(ExplosionImage);

  constructor(x: number, y: number) {
    super(SpaceshipImage, x, y);
    this._width = this._body.width = 90;
    this._height = this._body.height = 35;
  }

  die() {
    if (this._isDead) {
      return;
    }
    this._isDead = true;
    this.getSprite().texture = this._explosionTexture;
  }
}
