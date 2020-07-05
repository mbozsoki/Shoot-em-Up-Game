import Scene from "../entities/scene";
import { createButton } from "../helpers/ui-helper";
import ScenesManager from "../managers/scenesManager";
import { SceneId } from "../entities/game";

export default class MainScene extends Scene {
  constructor() {
    super();

    const containerBound = {
      width: ScenesManager.renderer.view.width,
      height: ScenesManager.renderer.view.height,
    };

    const exitGame = () => {
      // TODO navigate somewhere
      console.log("CLICKED");
    };
    const goToGameScene = () => {
      ScenesManager.goToScene(SceneId.Game);
    };

    const game1Button = createButton({
      label: "GAME1",
      onClickCallback: goToGameScene,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 100,
    });
    const game2Button = createButton({
      label: "GAME2",
      onClickCallback: goToGameScene,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 200,
    });
    const game3Button = createButton({
      label: "GAME3",
      onClickCallback: goToGameScene,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 300,
    });
    const exitButton = createButton({
      label: "EXIT",
      onClickCallback: exitGame,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 400,
    });

    this.addChild(game1Button);
    this.addChild(game2Button);
    this.addChild(game3Button);
    this.addChild(exitButton);
  }

  update() {
    super.update();
  }
}
