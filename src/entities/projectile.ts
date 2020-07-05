import ProjectileImage from "../assets/sprites/projectile.png";
import GameSprite from "./game-sprite";

export default class Projectile extends GameSprite {
  private PROJECTILE_VELOCITY = 10;

  constructor(x: number, y: number) {
    super(ProjectileImage, x, y);
    this._vx = this.PROJECTILE_VELOCITY;
  }
}
