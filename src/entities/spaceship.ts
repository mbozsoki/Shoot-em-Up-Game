import * as PIXI from "pixi.js";
import SpaceshipImage from "../assets/sprites/spaceship.gif";

export default class SpaceShip {
  private _body: PIXI.Sprite;
  private _vx: number;
  private _vy: number;
  private _width: number;
  private _height: number;

  constructor(x: number, y: number) {
    this._body = PIXI.Sprite.from(SpaceshipImage);
    this._body.position.x = x;
    this._body.position.y = y;
    this._body.anchor.x = 0.5;
    this._body.anchor.y = 0.5;
    this._width = this._body.width = 90;
    this._height = this._body.height = 35;
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

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
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
