export const isTouchSupported = 'ontouchstart' in window;

class Button {
  private dom: HTMLElement;
  public state: boolean;
  private downEvent: string;
  private upEvent: string;

  constructor(dom: HTMLElement) {
    this.state = false;
    this.dom = dom;
    this.downEvent = isTouchSupported ? 'touchstart' : 'mousedown';
    this.upEvent = isTouchSupported ? 'touchend' : 'mouseup';
    this.register();
  }

  public destroy() {
    this.deregister();
  }

  private register() {
    this.dom.addEventListener(this.downEvent, this.downHandler);
    this.dom.addEventListener(this.upEvent, this.upHandler);
  }

  private deregister() {
    this.dom.removeEventListener(this.downEvent, this.downHandler);
    this.dom.removeEventListener(this.upEvent, this.upHandler);
  }

  private downHandler = (e: Event) => {
    e.preventDefault();
    this.toggleState(true);
  };

  private upHandler = (e: Event) => {
    e.preventDefault();
    this.toggleState(false);
  };

  public toggleState(val: boolean) {
    this.state = val;
  }
}

export default Button;
