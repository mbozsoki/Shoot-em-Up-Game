import Scene from "../entities/scene";
import SpaceShip from "../entities/spaceship";
import KeyboardManager from "../managers/keyboardManager";
import ScenesManager from "../managers/scenesManager";
import Projectile from "../entities/projectile";

export default class GameScene extends Scene {
  private _left: KeyboardManager;
  private _up: KeyboardManager;
  private _right: KeyboardManager;
  private _down: KeyboardManager;
  private _space: KeyboardManager;

  private _player: SpaceShip;
  private _projectiles: Projectile[] = [];

  constructor() {
    super();

    this.setupPlayer();
    this.addChild(this._player.getSprite());
  }

  update() {
    super.update();
    this._player.setPositionX(this.calculatePlayerNextPositionX());
    this._player.setPositionY(this.calculatePlayerNextPositionY());
    this._projectiles.forEach((projectile) => {
      if (projectile.getPositionX() > ScenesManager.renderer.view.width) {
        this.removeChild(projectile.getSprite());
      } else {
        projectile.setPositionX(projectile.getPositionX() + projectile.vx);
      }
    });
  }

  private calculatePlayerNextPositionX(): number {
    let nextPositionX = this._player.getPositionX() + this._player.vx;
    const maxPositionX =
      ScenesManager.renderer.view.width - this._player.width / 2;
    const minPositionX = this._player.width / 2;

    if (nextPositionX < minPositionX) {
      return minPositionX;
    }

    if (nextPositionX > maxPositionX) {
      return maxPositionX;
    }

    return nextPositionX;
  }

  private calculatePlayerNextPositionY(): number {
    let nextPositionY = this._player.getPositionY() + this._player.vy;
    const maxPositionY =
      ScenesManager.renderer.view.height - this._player.height / 2;
    const minPositionY = this._player.height / 2;

    if (nextPositionY < minPositionY) {
      return minPositionY;
    }

    if (nextPositionY > maxPositionY) {
      return maxPositionY;
    }

    return nextPositionY;
  }

  // TODO call on game over
  cleanUpListeners() {
    this._up.unsubscribe();
    this._down.unsubscribe();
    this._left.unsubscribe();
    this._right.unsubscribe();
    this._space.unsubscribe();
  }

  private setupPlayer() {
    this._player = new SpaceShip(100, ScenesManager.renderer.view.height / 2);
    this.setupKeypressHandlers();
  }

  private setupKeypressHandlers() {
    this._left = new KeyboardManager("ArrowLeft");
    this._up = new KeyboardManager("ArrowUp");
    this._right = new KeyboardManager("ArrowRight");
    this._down = new KeyboardManager("ArrowDown");
    this._space = new KeyboardManager("Space");

    this._left.press = () => {
      this._player.vx = -5;
      this._player.vy = 0;
    };

    this._left.release = () => {
      if (!this._right.isDown && this._player.vy === 0) {
        this._player.vx = 0;
      }
    };

    this._up.press = () => {
      this._player.vy = -5;
      this._player.vx = 0;
    };
    this._up.release = () => {
      if (!this._down.isDown && this._player.vx === 0) {
        this._player.vy = 0;
      }
    };

    this._right.press = () => {
      this._player.vx = 5;
      this._player.vy = 0;
    };
    this._right.release = () => {
      if (!this._left.isDown && this._player.vy === 0) {
        this._player.vx = 0;
      }
    };

    this._down.press = () => {
      this._player.vy = 5;
      this._player.vx = 0;
    };
    this._down.release = () => {
      if (!this._up.isDown && this._player.vx === 0) {
        this._player.vy = 0;
      }
    };

    this._space.press = () => {
      const projectile = new Projectile(
        this._player.getPositionX(),
        this._player.getPositionY()
      );
      this._projectiles.push(projectile);
      this.addChild(projectile.getSprite());
    };
  }
}
