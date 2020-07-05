import ScenesManager from "../managers/scenesManager";
import SplashScene from "../scenes/splashScene";
import GameScene from "../scenes/gameScene";
import MainScene from "../scenes/mainScene";

export enum SceneId {
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
    new ScenesManager(element, rendererConfig);

    this.setupScenes();
  }

  private setupScenes() {
    this.setupSplashScene();
    this.setupMainScene();
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

  private setupGameScene() {
    const gameScene = ScenesManager.addScene(SceneId.Game, GameScene);
  }

  //#endregion Setup scenes
}
