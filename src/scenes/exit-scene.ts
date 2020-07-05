import Scene from "../entities/scene";
import * as PIXI from "pixi.js";
import { createTitle } from "../helpers/ui-helpers";
import ScenesManager from "../managers/scenes-manager";
import { SceneId } from "./game";

export default class ExitScene extends Scene {
  constructor() {
    super();

    const title = createTitle({
      label: "You exited the game",
      containerBound: {
        width: ScenesManager.renderer.view.width,
        height: ScenesManager.renderer.view.height,
      },
      alignCenterHorizontally: true,
      alignCenterVertically: true,
    });
    this.addChild(title);
  }
  update() {
    super.update();
  }
}
