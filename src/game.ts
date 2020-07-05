import SpaceShip from "./spaceship";
import Keyboard from "./keyboardManager";
import KeyboardManager from "./keyboardManager";
import ScenesManager from "./ScenesManager";
import SplashScene from "./scenes/splashScene";
import GameScene from "./scenes/GameScene";

enum SceneId {
  Splash = "splash",
  Main = "main",
  Game = "game",
}

export default class Game {

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
    this.setupSplashScene();
    this.setupGameScene();

    this.scenesManager.goToScene(SceneId.Splash);
  }

  //#region Setup scenes
  private setupSplashScene() {
    const splashScene = this.scenesManager.addScene(
      SceneId.Splash,
      SplashScene
    );
    splashScene.onUpdate(() => {});
    (splashScene as SplashScene).goToNextSceneCallback = () => {
      this.scenesManager.goToScene(SceneId.Game);
    };
  }

  private setupGameScene() {
    const gameScene = this.scenesManager.addScene(SceneId.Game, GameScene);
    (gameScene as GameScene).quitToMainMenuCallback = () => {
      this.scenesManager.goToScene(SceneId.Main);
    }
  }

  //#endregion Setup scenes
}
