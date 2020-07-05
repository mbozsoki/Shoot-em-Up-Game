import * as PIXI from "pixi.js";

export interface ITextOptions {
  label: string;
  containerBound?: {
    width: number;
    height: number;
  };
  alignCenterHorizontally?: boolean;
  alignCenterVertically?: boolean;
  positionX?: number;
  positionY?: number;
}

export interface IInteractiveTextOptions extends ITextOptions {
  onClickCallback?: () => void;
}

export function createTitle(options: ITextOptions): PIXI.Text {
  const {
    label,
    alignCenterHorizontally,
    alignCenterVertically,
    positionX,
    positionY,
  } = options;
  let { containerBound } = options;
  containerBound = containerBound || { width: 0, height: 0 };

  const title = new PIXI.Text(label, getTitleStyle());

  let x = title.position.x;
  let y = title.position.y;
  if (alignCenterHorizontally) {
    x = containerBound.width / 2 - title.width / 2;
  } else if (positionX) {
    x = positionX;
  }

  if (alignCenterVertically) {
    y = containerBound.height / 2 - title.height / 2;
  } else if (positionY) {
    y = positionY;
  }

  title.position.set(x, y);

  return title;
}

export function createButton(options: IInteractiveTextOptions) {
  const {
    label,
    onClickCallback,
    alignCenterHorizontally,
    alignCenterVertically,
    positionX,
    positionY,
  } = options;
  let { containerBound } = options;
  containerBound = containerBound || { width: 0, height: 0 };

  const button = new PIXI.Text(label, getButtonStyle());
  button.interactive = true;
  button.buttonMode = true;
  button.on("click", onClickCallback);
  button.on("mouseover", () => {
    button.style = { ...getButtonStyle(), fill: 0x00ff00 };
  });

  button.on("mouseout", () => {
    button.style = { ...getButtonStyle(), fill: 0xffffff };
  });

  let x = button.position.x;
  let y = button.position.y;
  if (alignCenterHorizontally) {
    x = containerBound.width / 2 - button.width / 2;
  } else if (positionX) {
    x = positionX;
  }

  if (alignCenterVertically) {
    y = containerBound.height / 2 - button.height / 2;
  } else if (positionY) {
    y = positionY;
  }

  button.position.set(x, y);

  return button;
}

function getTitleStyle(): PIXI.TextStyle {
  return new PIXI.TextStyle({
    fontFamily: "Helvetica",
    fontSize: 62,
    fill: "white",
  });
}

function getButtonStyle(): PIXI.TextStyle {
  return new PIXI.TextStyle({
    fontFamily: "Helvetica",
    fontSize: 62,
    fill: "white",
  });
}
