import Button, { isTouchSupported } from './Button';

class Buttons {
  buttons: Button[];

  constructor(buttonDOMs: HTMLElement[]) {
    this.buttons = buttonDOMs.map((dom) => new Button(dom));
    this.register();
  }

  public destroy() {
    this.deregister();
    this.buttons.map((button) => button.destroy());
  }

  private register() {
    if (!isTouchSupported) document.addEventListener('mouseup', this.uphandler);
  }

  private deregister() {
    if (!isTouchSupported)
      document.removeEventListener('mouseup', this.uphandler);
  }

  private uphandler = (e: Event) => {
    e.preventDefault();
    this.buttons.map((button) => button.toggleState(false));
  };

  public get state(): boolean[] {
    return this.buttons.map((button) => button.state);
  }
}

export default Buttons;
