import * as PIXI from "pixi.js";
import SpaceShip from "./spaceship";
import Keyboard from "./keyboard";
import KeyboardHandler from "./keyboard";

export default class Game {
  stage: PIXI.Container;
  player: SpaceShip;
  left: KeyboardHandler;
  up: KeyboardHandler;
  right: KeyboardHandler;
  down: KeyboardHandler;

  private renderer: PIXI.Renderer;

  constructor(element: Element) {
    this.setupEnvironment(element);
    this.setupPlayer();
    this.start();
  }

  private setupEnvironment(element: Element) {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer({
      width: 860,
      height: 640,
      antialias: true,
      transparent: false,
      resolution: 1,
    });
    element.appendChild(this.renderer.view);
  }

  private setupPlayer() {
    this.player = new SpaceShip(this, 100, this.renderer.view.height / 2);
    this.left = new Keyboard("ArrowLeft");
    this.up = new Keyboard("ArrowUp");
    this.right = new Keyboard("ArrowRight");
    this.down = new Keyboard("ArrowDown");

    this.left.press = () => {
      this.player.vx = -5;
      this.player.vy = 0;
    };

    this.left.release = () => {
      if (!this.right.isDown && this.player.vy === 0) {
        this.player.vx = 0;
      }
    };

    this.up.press = () => {
      this.player.vy = -5;
      this.player.vx = 0;
    };
    this.up.release = () => {
      if (!this.down.isDown && this.player.vx === 0) {
        this.player.vy = 0;
      }
    };

    this.right.press = () => {
      this.player.vx = 5;
      this.player.vy = 0;
    };
    this.right.release = () => {
      if (!this.left.isDown && this.player.vy === 0) {
        this.player.vx = 0;
      }
    };

    this.down.press = () => {
      this.player.vy = 5;
      this.player.vx = 0;
    };
    this.down.release = () => {
      if (!this.up.isDown && this.player.vx === 0) {
        this.player.vy = 0;
      }
    };
  }

  private start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  private tick() {
    this.player.setPositionX(this.player.getPositionX() + this.player.vx);
    this.player.setPositionY(this.player.getPositionY() + this.player.vy);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.tick.bind(this));
  }

  private end() {
    this.up.unsubscribe();
    this.down.unsubscribe();
    this.left.unsubscribe();
    this.right.unsubscribe();
  }
}
