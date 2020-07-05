import JunkImage from "../assets/sprites/junk.png";
import GameSprite from "./game-sprite";

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export default class Junk extends GameSprite {
  private JUNK_VELOCITY = 5;
  private _direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    super(JunkImage, x, y);
    this._vx = this.JUNK_VELOCITY;
    this._vy = this.JUNK_VELOCITY;
    this._direction = direction;
  }

  get direction(): Direction {
    return this._direction;
  }
}
