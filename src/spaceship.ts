import * as PIXI from "pixi.js";
import Game from "./game";
import SpaceshipImage from "./assets/sprites/spaceship.png";

export default class SpaceShip {
  private _body: PIXI.Sprite;
  private _vx: number;
  private _vy: number;

  constructor(x: number, y: number) {
    this._body = PIXI.Sprite.from(SpaceshipImage);
    this._body.position.x = x;
    this._body.position.y = y;
    this._body.angle = 90;
    this._body.anchor.x = 0.5;
    this._body.anchor.y = 0.5;
    this._body.width = 70;
    this._body.height = 100;
  }

  getSprite(): PIXI.Sprite {
    return this._body;
  }

  getPositionX() {
    return this._body.position.x;
  }
  getPositionY() {
    return this._body.position.y;
  }

  get vx() {
    return this._vx;
  }
  get vy() {
    return this._vy;
  }

  setPositionX(x: number) {
    if (isNaN(x)) {
      return;
    }

    this._body.position.x = x;
  }

  setPositionY(y: number) {
    if (isNaN(y)) {
      return;
    }

    this._body.position.y = y;
  }

  set vx(vx: number) {
    this._vx = vx;
  }

  set vy(vy: number) {
    this._vy = vy;
  }
}
