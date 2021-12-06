import { lerp, nearlyEqual } from './utils';

type MouseCoords = {
  x: number;
  y: number;
};

type CursorCoords = {
  x: number;
  y: number;
};

type MouseAction = (cursorElement: HTMLDivElement, shapeElement: HTMLDivElement) => void;

export default class Cursor {
  cursorElement: HTMLDivElement;
  shapeElement!: HTMLDivElement | null;
  bounds: DOMRect;
  mouseCoords: MouseCoords;
  cursorCoords: CursorCoords;
  speed = 0.2;
  animationFrame: number | null = null;
  isAnimating = false;

  constructor(el: HTMLDivElement, onMouseDown?: MouseAction, onMouseUp?: MouseAction) {
    this.cursorElement = el;
    this.shapeElement = el.querySelector('div');
    this.bounds = this.getBounds();
    this.mouseCoords = { x: -100, y: -100 };
    this.cursorCoords = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mousedown', () => this.onMouseDown(onMouseDown));
    window.addEventListener('mouseup', () => this.onMouseUp(onMouseUp));

    this.run();
  }

  run() {
    this.isAnimating = true;
    this.animationFrame = requestAnimationFrame(() => this.animateCursor());
  }

  stop() {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
  }

  private getBounds() {
    return this.cursorElement.getBoundingClientRect();
  }

  private animateCursor() {
    this.bounds = this.getBounds();

    const xOffset = this.bounds.width / 2;
    const yOffset = this.bounds.height / 2;
    const x = lerp(this.cursorCoords.x, this.mouseCoords.x, this.speed);
    const y = lerp(this.cursorCoords.y, this.mouseCoords.y, this.speed);

    // Move cursor position
    this.cursorElement.style.transform = `translate(${x - xOffset}px, ${y - yOffset}px)`;

    // Save cursor coordinates
    this.cursorCoords = { x, y };

    if (nearlyEqual(this.mouseCoords.x, x)) {
      this.isAnimating = false;
      return;
    }

    this.run();
  }

  private onMouseMove(e: MouseEvent): void {
    // console.log({
    //   clientX: e.clientX,
    //   clientY: e.clientY,
    //   width: this.bounds.width,
    //   height: this.bounds.height,
    //   left: e.clientX - this.bounds.width / 2,
    //   top: e.clientY - this.bounds.height / 2,
    // });

    this.mouseCoords = {
      x: e.clientX,
      y: e.clientY,
    };

    // Only trigger animation on mouse movement if there is no animation running
    if (!this.isAnimating) {
      this.run();
    }
  }

  private onMouseDown(callback?: MouseAction) {
    if (callback && this.shapeElement) {
      callback(this.cursorElement, this.shapeElement);
      this.run();
    }
  }

  private onMouseUp(callback?: MouseAction) {
    if (callback && this.shapeElement) {
      callback(this.cursorElement, this.shapeElement);
      this.run();
    }
  }
}
