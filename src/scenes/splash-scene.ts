import Scene from "../entities/scene";
import * as PIXI from "pixi.js";
import { createTitle } from "../helpers/ui-helpers";
import ScenesManager from "../managers/scenes-manager";
import { SceneId } from "./game";

export default class SplashScene extends Scene {
  private SPLASH_SCREEN_SHOW_DURATION = 2 * 1000;
  private FADE_STEP = 0.03;

  private _shouldFadeOut: boolean = false;
  private _opacity = 1;

  constructor() {
    super();

    const title = createTitle({
      label: "Space Shoot'em Up!",
      containerBound: {
        width: ScenesManager.renderer.view.width,
        height: ScenesManager.renderer.view.height,
      },
      alignCenterHorizontally: true,
      alignCenterVertically: true,
    });
    this.addChild(title);

    setTimeout(() => {
      this._shouldFadeOut = true;
    }, this.SPLASH_SCREEN_SHOW_DURATION);
  }
  update() {
    super.update();
    if (this._shouldFadeOut && this._opacity > 0) {
      this.alpha = this._opacity =
        Math.floor((this._opacity - this.FADE_STEP) * 100) / 100;
    }

    if (this._opacity <= 0) {
      ScenesManager.goToScene(SceneId.Main);
    }
  }
}
