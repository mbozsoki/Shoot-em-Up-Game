import * as PIXI from "pixi.js";
import Scene from "../entities/scene";
import SpaceShip from "../entities/spaceship";
import KeyboardManager from "../managers/keyboard-manager";
import ScenesManager from "../managers/scenes-manager";
import Projectile from "../entities/projectile";
import Alien from "../entities/alien";
import BackgroundBackImage from "../assets/images/parallax-bg-1.png";
import BackgroundMiddleImage from "../assets/images/parallax-bg-2.png";
import BackgroundFrontImage from "../assets/images/parallax-bg-3.png";
import { areRectsIntersect } from "../helpers/game-helpers";
import { SceneId } from "./game";
import Junk, { Direction } from "../entities/junk";

export default class GameScene extends Scene {
  private ALIEN_SPAWN_TIME = 2 * 1000;
  private KILLED_TIMEOUT = 500;

  private _left: KeyboardManager;
  private _up: KeyboardManager;
  private _right: KeyboardManager;
  private _down: KeyboardManager;
  private _space: KeyboardManager;

  private _backgroundX: number = 0;
  private _backgroundSpeed: number = 1;
  private _backgroundBack: PIXI.TilingSprite;
  private _backgroundMiddle: PIXI.TilingSprite;
  private _backgroundFront: PIXI.TilingSprite;

  private _player: SpaceShip;
  private _projectiles: Projectile[] = [];
  private _enemies: Alien[] = [];
  private _junks: Junk[] = [];

  private _spawnEnemyInterval: number = null;
  private _spriteCleanUpTimeouts: number[] = [];

  private _onGameOver: () => void;

  constructor() {
    super();
  }

  set onGameOver(cb: () => void) {
    this._onGameOver = cb;
  }

  update() {
    super.update();
    this.updateBackground();
    this.updatePlayer();
    this.updateProjectiles();
    this.updateJunks();
    this.updateEnemies();
  }

  reset() {
    this.setupBackground();

    this.setupPlayer();
    this.addChild(this._player.getSprite());

    this._spawnEnemyInterval = window.setInterval(() => {
      this.addEnemy();
    }, this.ALIEN_SPAWN_TIME);
  }

  private setupBackground() {
    const backgroundBackTexture = PIXI.Texture.from(BackgroundBackImage);
    const backgroundMiddleTexture = PIXI.Texture.from(BackgroundMiddleImage);
    const backgroundFrontTexture = PIXI.Texture.from(BackgroundFrontImage);

    this._backgroundBack = this.createBackground(backgroundBackTexture);
    this._backgroundMiddle = this.createBackground(backgroundMiddleTexture);
    this._backgroundFront = this.createBackground(backgroundFrontTexture);
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

  private addEnemy() {
    const startPositionX = ScenesManager.renderer.view.width - 74;
    const startPositionY =
      Math.random() * (ScenesManager.renderer.view.height - 30);
    const alien = new Alien(startPositionX, startPositionY);
    this._enemies.push(alien);
    this.addChild(alien.getSprite());
  }

  private createBackground(texture: PIXI.Texture) {
    const tiling = new PIXI.TilingSprite(texture, 800, 600);
    tiling.position.set(0, 0);
    this.addChild(tiling);
    return tiling;
  }

  //#region Update functions

  private updateBackground() {
    this._backgroundX -= this._backgroundSpeed;
    this._backgroundBack.x = this._backgroundX / 4;
    this._backgroundMiddle.x = this._backgroundX / 2;
    this._backgroundFront.x = this._backgroundX;
  }

  private updatePlayer() {
    this._player.setPositionX(this.calculatePlayerNextPositionX());
    this._player.setPositionY(this.calculatePlayerNextPositionY());
  }

  private updateProjectiles() {
    this._projectiles.forEach((projectile: Projectile) => {
      if (projectile.getPositionX() > ScenesManager.renderer.view.width) {
        this.removeChild(projectile.getSprite());
      } else {
        projectile.setPositionX(projectile.getPositionX() + projectile.vx);
        projectile.setPositionX(projectile.getPositionX() + Math.random() * 2);
      }

      this._enemies.forEach((enemy: Alien, index: number) => {
        if (areRectsIntersect(projectile.getSprite(), enemy.getSprite())) {
          this._enemies.splice(index, 1);
          enemy.die();
          this.createJunks(enemy.getPositionX(), enemy.getPositionY());
          this._spriteCleanUpTimeouts.push(
            window.setTimeout(() => {
              this.removeChild(enemy.getSprite());
            }, this.KILLED_TIMEOUT)
          );
        }
      });
    });
  }

  private updateJunks() {
    this._junks.forEach((junk: Junk) => {
      switch (junk.direction) {
        case Direction.Up:
          if (junk.getPositionY() < 0) {
            this.removeChild(junk.getSprite());
          } else {
            junk.setPositionY(junk.getPositionY() + junk.vy);
          }
          break;
        case Direction.Down:
          if (junk.getPositionY() > ScenesManager.renderer.view.height) {
            this.removeChild(junk.getSprite());
          } else {
            junk.setPositionY(junk.getPositionY() - junk.vy);
          }
          break;
        case Direction.Left:
          if (junk.getPositionX() < 0) {
            this.removeChild(junk.getSprite());
          } else {
            junk.setPositionX(junk.getPositionX() + junk.vx);
          }
          break;
        case Direction.Right:
          if (junk.getPositionX() > ScenesManager.renderer.view.height) {
            this.removeChild(junk.getSprite());
          } else {
            junk.setPositionX(junk.getPositionX() - junk.vx);
          }
          break;
      }

      if (areRectsIntersect(this._player.getSprite(), junk.getSprite())) {
        this.unsubscribeKeypressListeners();
        this._player.die();
        this._spriteCleanUpTimeouts.push(
          window.setTimeout(() => {
            this.gameOver();
          }, this.KILLED_TIMEOUT)
        );
      }
    });
  }
  private updateEnemies() {
    this._enemies.forEach((enemy: Alien) => {
      if (
        !enemy.targetPositionY ||
        Math.round(enemy.getPositionY()) === enemy.targetPositionY
      ) {
        enemy.targetPositionY = Math.floor(
          Math.random() * ScenesManager.renderer.view.height
        );
      }

      if (enemy.getPositionX() < 0) {
        this.removeChild(enemy.getSprite());
        return;
      } else {
        enemy.setPositionX(enemy.getPositionX() - enemy.vx);
      }

      if (enemy.getPositionY() > enemy.targetPositionY) {
        enemy.setPositionY(enemy.getPositionY() - enemy.vy);
      } else {
        enemy.setPositionY(enemy.getPositionY() + enemy.vy);
      }

      if (areRectsIntersect(this._player.getSprite(), enemy.getSprite())) {
        this.unsubscribeKeypressListeners();
        this._player.die();
        this._spriteCleanUpTimeouts.push(
          window.setTimeout(() => {
            this.gameOver();
          }, this.KILLED_TIMEOUT)
        );
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

  private createJunks(x: number, y: number) {
    const junk1 = new Junk(x, y, Direction.Up);
    const junk2 = new Junk(x, y, Direction.Down);
    const junk3 = new Junk(x, y, Direction.Left);
    const junk4 = new Junk(x, y, Direction.Right);

    this._junks.push(junk1);
    this._junks.push(junk2);
    this._junks.push(junk3);
    this._junks.push(junk4);

    this.addChild(junk1.getSprite());
    this.addChild(junk2.getSprite());
    this.addChild(junk3.getSprite());
    this.addChild(junk4.getSprite());
  }

  //#endregion Update functions

  private gameOver() {
    this.clearIntervalsAndTimeouts();
    ScenesManager.goToScene(SceneId.Main);
    this._onGameOver();
  }

  private unsubscribeKeypressListeners() {
    this._up.unsubscribe();
    this._down.unsubscribe();
    this._left.unsubscribe();
    this._right.unsubscribe();
    this._space.unsubscribe();
  }

  private clearIntervalsAndTimeouts() {
    window.clearInterval(this._spawnEnemyInterval);
    this._spriteCleanUpTimeouts.forEach((timeoutId) =>
      window.clearTimeout(timeoutId)
    );
  }
}
