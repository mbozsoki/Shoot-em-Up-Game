import * as PIXI from "pixi.js";
import ProjectileImage from "../assets/sprites/projectile.png";

export default class Projectile {
  private _body: PIXI.Sprite;
  private _vx: number = 10;

  constructor(x: number, y: number) {
    this._body = PIXI.Sprite.from(ProjectileImage);
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
}
