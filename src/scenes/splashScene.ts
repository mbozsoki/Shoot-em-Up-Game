import Scene from "../scene";
import * as PIXI from "pixi.js";

export default class SplashScene extends Scene {
  private SPLASH_SCREEN_SHOW_DURATION = 2 * 1000;
  private FADE_STEP = 0.05;


  private _shouldFadeOut: boolean = false;
  private _opacity = 1;
  private _goToNextScene: () => void;

  constructor() {
    super();

    const title = new PIXI.Text("Space Shoot'em Up!", this.getTitleStyle());

    const viewBound = { width: 860, height: 640 }; // TODO get render.view bound
    const centeredPosition = {
      x: viewBound.width / 2 - title.width / 2,
      y: viewBound.height / 2 - title.height / 2,
    };

    title.position.set(centeredPosition.x, centeredPosition.y);
    this.addChild(title);

    setTimeout(() => {
      this._shouldFadeOut = true;
    }, this.SPLASH_SCREEN_SHOW_DURATION);
  }

  update() {
    super.update();
    if (this._shouldFadeOut && this._opacity > 0) {
        this.alpha = this._opacity = Math.floor((this._opacity - this.FADE_STEP) * 100) / 100;
    }

    if (this._opacity <= 0) {
        this._goToNextScene();
    }
  }

  setGoToNextScene(cb: () => void) {
      this._goToNextScene = cb;
  }

  private getTitleStyle(): PIXI.TextStyle {
    return new PIXI.TextStyle({
      fontFamily: "Helvetica",
      fontSize: 62,
      fill: "white",
    });
  }
}
