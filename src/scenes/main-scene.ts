import Scene from "../entities/scene";
import { createButton, createLogo } from "../helpers/ui-helpers";
import ScenesManager from "../managers/scenes-manager";
import { SceneId } from "./game";
import SpaceshipImage from "../assets/sprites/spaceship.gif";
import AlienSpaceshipImage from "../assets/sprites/alien-spaceship.png";

export default class MainScene extends Scene {
  constructor() {
    super();

    const containerBound = {
      width: ScenesManager.renderer.view.width,
      height: ScenesManager.renderer.view.height,
    };

    const exitGame = () => {
      ScenesManager.goToScene(SceneId.Exit);
    };
    const goToGameScene = () => {
      ScenesManager.goToScene(SceneId.Game);
    };

    const game1Logo = createLogo({
      src: SpaceshipImage,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 90,
    });
    const game1Button = createButton({
      label: "GAME1",
      onClickCallback: goToGameScene,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 100,
    });

    const game2Logo = createLogo({
      src: SpaceshipImage,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 200,
    });
    const game2Button = createButton({
      label: "GAME2",
      onClickCallback: goToGameScene,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 210,
    });

    const game3Logo = createLogo({
      src: SpaceshipImage,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 320,
    });
    const game3Button = createButton({
      label: "GAME3",
      onClickCallback: goToGameScene,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 330,
    });

    const exitLogo = createLogo({
      src: AlienSpaceshipImage,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 440,
    });
    const exitButton = createButton({
      label: "EXIT",
      onClickCallback: exitGame,
      containerBound,
      alignCenterHorizontally: true,
      positionY: 450,
    });

    this.addChild(game1Logo);
    this.addChild(game1Button);
    this.addChild(game2Logo);
    this.addChild(game2Button);
    this.addChild(game3Logo);
    this.addChild(game3Button);
    this.addChild(exitLogo);
    this.addChild(exitButton);
  }

  update() {
    super.update();
  }
}
