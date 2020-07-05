import Scene from "../scene";
import SpaceShip from "../spaceship";
import KeyboardManager from "../keyboardManager";

export default class GameScene extends Scene {
  private _quitToMainMenuCallback: () => void;

  private _player: SpaceShip;
  private _left: KeyboardManager;
  private _up: KeyboardManager;
  private _right: KeyboardManager;
  private _down: KeyboardManager;

  constructor() {
    super();

    this.setupPlayer();
    this.addChild(this._player.getSprite());
  }

  set quitToMainMenuCallback(cb: () => void) {
    this._quitToMainMenuCallback = cb;
  }

  update() {
    super.update();
    this._player.setPositionX(this._player.getPositionX() + this._player.vx);
    this._player.setPositionY(this._player.getPositionY() + this._player.vy);
  }

  // TODO call on game over
  cleanUpListeners() {
    this._up.unsubscribe();
    this._down.unsubscribe();
    this._left.unsubscribe();
    this._right.unsubscribe();
  }

  private setupPlayer() {
    const viewHeight = 860; // TODO
    this._player = new SpaceShip(100, viewHeight / 2);
    this.setupKeypressHandlers();
  }

  private setupKeypressHandlers() {
    this._left = new KeyboardManager("ArrowLeft");
    this._up = new KeyboardManager("ArrowUp");
    this._right = new KeyboardManager("ArrowRight");
    this._down = new KeyboardManager("ArrowDown");

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
  }
}
