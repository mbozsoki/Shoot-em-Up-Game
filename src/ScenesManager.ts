import * as PIXI from "pixi.js";
import Scene from "./scene";
import { IPixiRendererOptions } from "./types/pixiRendererOptions";

enum GameState {
  Stopped = "stopped",
  Playing = "playing",
}
export default class ScenesManager {
  private _renderer: PIXI.Renderer;
  private _currentScene: Scene;
  private _state: GameState;

  private _scenes: any = {};

  constructor(element: Element, rendererOptions: IPixiRendererOptions) {
    this._state = GameState.Stopped;
    this._renderer = PIXI.autoDetectRenderer(rendererOptions);
    element.appendChild(this._renderer.view);
    requestAnimationFrame(this.loop);
  }

  get renderer(): PIXI.Renderer {
    return this._renderer;
  }

  addScene(id: string): Scene {
    if (this._scenes[id]) {
      throw new Error(
        `There is a screen already added with the given id: ${id}. Scene id should be unique.`
      );
    }

    const scene = new Scene();
    this._scenes[id] = scene;

    return scene;
  }

  goToScene(id: string): void {
    if (this._scenes[id]) {
      if (this._currentScene) {
        this._currentScene.pause();
      }
      this._currentScene = this._scenes[id];
      this._currentScene.resume();
      if (this._state === GameState.Stopped) {
        this._state = GameState.Playing;
        this.loop();
      }
      return;
    }

    throw new Error(`Scene is not found with the given id: ${id}`);
  }
  private loop() {
    this._currentScene.update();
    this._renderer.render(this._currentScene);

    if (!this._currentScene || this._currentScene.isPaused()) {
      this._state = GameState.Stopped;
      return;
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}
