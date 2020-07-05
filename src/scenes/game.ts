import ScenesManager from "../managers/scenes-manager";
import SplashScene from "./splash-scene";
import GameScene from "./game-scene";
import MainScene from "./main-scene";
import ExitScene from "./exit-scene";

export enum SceneId {
  Splash = "splash",
  Main = "main",
  Exit = "exit",
  Game = "game",
}

export default class Game {
  constructor(element: Element) {
    const rendererConfig = {
      width: 800,
      height: 600,
      antialias: true,
      transparent: false,
      resolution: 1,
    };
    new ScenesManager(element, rendererConfig);

    this.setupScenes();
  }

  private setupScenes() {
    this.setupSplashScene();
    this.setupMainScene();
    this.setupExitScene();
    this.setupGameScene();

    ScenesManager.goToScene(SceneId.Splash);
  }

  //#region Setup scenes
  private setupSplashScene() {
    const splashScene = ScenesManager.addScene(SceneId.Splash, SplashScene);
    splashScene.onUpdate(() => {});
  }

  private setupMainScene() {
    const mainScene = ScenesManager.addScene(SceneId.Main, MainScene);
  }

  private setupExitScene() {
    const exitScene = ScenesManager.addScene(SceneId.Exit, ExitScene);
  }

  private setupGameScene() {
    const gameScene = ScenesManager.addScene(SceneId.Game, GameScene);
    (gameScene as GameScene).onGameOver = this.gameOver.bind(this);
  }

  private gameOver() {
    ScenesManager.destroyScene(SceneId.Game);
    this.setupGameScene();
  }

  //#endregion Setup scenes
}
