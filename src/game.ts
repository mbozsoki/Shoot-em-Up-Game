import * as PIXI from "pixi.js";

export default class Game {
  stage: PIXI.Container;

  private renderer: PIXI.Renderer;

  constructor(element: Element) {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer({
      width: 860,
      height: 640,
      antialias: true,
      transparent: false,
      resolution: 1,
    });
    element.appendChild(this.renderer.view);
    requestAnimationFrame(this.tick.bind(this));
  }

  private tick() {
    this.renderer.render(this.stage);
    requestAnimationFrame(this.tick.bind(this));
  }
}
