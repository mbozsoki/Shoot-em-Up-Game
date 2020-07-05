import SpaceShip from "./spaceship";
import Keyboard from "./keyboardManager";
import KeyboardManager from "./keyboardManager";
import ScenesManager from "./ScenesManager";
import SplashScene from "./scenes/splashScene";

enum SceneId {
  Splash = "splash",
  Game = "game",
}

export default class Game {
  private _player: SpaceShip;
  private _left: KeyboardManager;
  private _up: KeyboardManager;
  private _right: KeyboardManager;
  private _down: KeyboardManager;

  private scenesManager: ScenesManager;

  constructor(element: Element) {
    const rendererConfig = {
      width: 860,
      height: 640,
      antialias: true,
      transparent: false,
      resolution: 1,
    };
    this.scenesManager = new ScenesManager(element, rendererConfig);

    this.setupScenes();
  }

  private setupScenes() {
    const splashScene = this.scenesManager.addScene(
      SceneId.Splash,
      SplashScene
    );
    this.setupGameScene();
    splashScene.onUpdate(() => {});
    (splashScene as SplashScene).setGoToNextScene(() =>
      this.scenesManager.goToScene(SceneId.Game)
    );

    this.scenesManager.goToScene(SceneId.Splash);
  }

  private setupGameScene() {
    const gameScene = this.scenesManager.addScene(SceneId.Game);
    this.setupPlayer();
    gameScene.addChild(this._player.getSprite());
  }

  private setupPlayer() {
    this._player = new SpaceShip(
      this,
      100,
      this.scenesManager.renderer.view.height / 2
    );
    this._left = new Keyboard("ArrowLeft");
    this._up = new Keyboard("ArrowUp");
    this._right = new Keyboard("ArrowRight");
    this._down = new Keyboard("ArrowDown");

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

  private end() {
    this._up.unsubscribe();
    this._down.unsubscribe();
    this._left.unsubscribe();
    this._right.unsubscribe();
  }

  private updatePlayer() {
    this._player.setPositionX(this._player.getPositionX() + this._player.vx);
    this._player.setPositionY(this._player.getPositionY() + this._player.vy);
  }
}
