export default class KeyboardHandler {
  private _value: string;
  private _isDown: boolean = false;
  private _isUp: boolean = true;
  private _press: () => void;
  private _release: () => void;

  private keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === this._value) {
      if (this._isUp && this._press) this._press();
      this._isDown = true;
      this._isUp = false;
      event.preventDefault();
    }
  };

  private keyUpHandler = (event: KeyboardEvent) => {
    if (event.key === this._value) {
      if (this._isDown && this._release) this._release();
      this._isDown = false;
      this._isUp = true;
      event.preventDefault();
    }
  };

  private keyDownListener = this.keyDownHandler.bind(this);
  private keyUpListener = this.keyUpHandler.bind(this);

  constructor(value: string) {
    this._value = value;
    window.addEventListener(
      "keydown", this.keyDownListener, false
    );
    window.addEventListener(
      "keyup", this.keyUpListener, false
    );
  }

  set press(fn: () => void) {
    this._press = fn;
  }

  set release(fn: () => void) {
    this._release = fn;
  }

  get isDown(): boolean {
    return this._isDown;
  }

  get isUp(): boolean {
    return this._isUp;
  }

  unsubscribe = () => {
    window.removeEventListener("keydown", this.keyDownListener);
    window.removeEventListener("keyup", this.keyUpListener);
  };
}
