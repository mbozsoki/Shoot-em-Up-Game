import * as PIXI from "pixi.js";

export default abstract class GameSprite {
  protected _body: PIXI.Sprite;
  protected _vx: number;
  protected _vy: number;
  protected _width: number;
  protected _height: number;

  constructor(spriteSrc: string, x: number, y: number) {
    this._body = PIXI.Sprite.from(spriteSrc);
    this._body.position.x = x;
    this._body.position.y = y;
    this._body.anchor.x = 0.5;
    this._body.anchor.y = 0.5;
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
