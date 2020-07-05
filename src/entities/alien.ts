import * as PIXI from "pixi.js";
import AlienSpaceshipImage from "../assets/sprites/alien-spaceship.png";
import ExplosionImage from "../assets/sprites/explosion.png";
import GameSprite from "./game-sprite";

export default class Alien extends GameSprite {
  private ALIEN_SPEED = 1;
  private _targetPositionY: number;
  private _isDead = false;
  private _explosionTexture = PIXI.Texture.from(ExplosionImage);

  constructor(x: number, y: number) {
    super(AlienSpaceshipImage, x, y);
    this._width = this._body.width;
    this._height = this._body.height;
    this._vx = this.ALIEN_SPEED;
    this._vy = this.ALIEN_SPEED;
  }

  set targetPositionY(y: number) {
    this._targetPositionY = y;
  }

  get targetPositionY(): number {
    return this._targetPositionY;
  }

  die() {
    if (this._isDead) {
      return;
    }
    this._isDead = true;
    this.getSprite().texture = this._explosionTexture;
  }
}
