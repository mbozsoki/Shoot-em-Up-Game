import * as PIXI from "pixi.js";
import Scene from "../entities/scene";
import { IPixiRendererOptions } from "../types/pixiRendererOptions";

enum GameState {
  Stopped = "stopped",
  Playing = "playing",
}
export default class ScenesManager {
  static renderer: PIXI.Renderer;
  private static _currentScene: Scene;
  private static _state: GameState;

  private static _scenes: any = {};

  constructor(element: Element, rendererOptions: IPixiRendererOptions) {
    ScenesManager._state = GameState.Stopped;
    ScenesManager.renderer = PIXI.autoDetectRenderer(rendererOptions);
    element.appendChild(ScenesManager.renderer.view);
    requestAnimationFrame(ScenesManager.loop.bind(ScenesManager));
  }

  static addScene(id: string, TScene: new () => Scene = Scene): Scene {
    if (ScenesManager._scenes[id]) {
      throw new Error(
        `There is a screen already added with the given id: ${id}. Scene id should be unique.`
      );
    }

    const scene = new TScene();
    ScenesManager._scenes[id] = scene;

    return scene;
  }

  static goToScene(id: string): void {
    if (ScenesManager._scenes[id]) {
      if (ScenesManager._currentScene) {
        ScenesManager._currentScene.pause();
      }
      console.log(`Go to scene ${id}`)
      ScenesManager._currentScene = ScenesManager._scenes[id];
      ScenesManager._currentScene.resume();
      if (ScenesManager._state === GameState.Stopped) {
        ScenesManager._state = GameState.Playing;
        ScenesManager.loop();
      }
      return;
    }

    throw new Error(`Scene is not found with the given id: ${id}`);
  }
  private static loop() {
    ScenesManager._currentScene.update();
    ScenesManager.renderer.render(ScenesManager._currentScene);

    if (!ScenesManager._currentScene || ScenesManager._currentScene.isPaused()) {
      ScenesManager._state = GameState.Stopped;
      return;
    }

    requestAnimationFrame(ScenesManager.loop.bind(ScenesManager));
  }
}
