import * as PIXI from "pixi.js";

export default class Scene extends PIXI.Container {
  private _paused: boolean = false;
  private _updateCallback: () => void = () => {};

  constructor() {
    super();
  }

  onUpdate(updateCallback: () => void) {
    this._updateCallback = updateCallback;
  }

  update() {
    this._updateCallback();
  }
  pause() {
    this._paused = true;
  }
  resume() {
    this._paused = false;
  }
  isPaused() {
    return this._paused;
  }
}
