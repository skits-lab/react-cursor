# React Cursor

Lightweight zero dependency React Cursor component.

Use the provided `Cursor` component, to add a animated cursor to your website.

## Installation

```sh
npm i @skits/react-cursor
```

## Usage

#### Basic example

```jsx
import Cursor from '@skits/react-cursor';

export default function App() {
  return (
    <div className="app">
      <Cursor />
    </div>
  );
}
```

#### Example with props

```jsx
import Cursor from '@skits/react-cursor';

export default function App() {
  return (
    <div className="app">
      <Cursor
        size={40}
        color="red"
        opacity={0.3}
        radius="50%" // circle
        zIndex={-1} // use negative zIndex to place cursor below other elements
        className="custom-cursor-class"
      />
    </div>
  );
}
```

#### Scale shape element on click

```jsx
import Cursor from '@skits/react-cursor';

export default function App() {
  return (
    <div className="app">
      <Cursor
        size={40}
        onMouseDown={(cursorElement, shapeElement) => {
          shapeElement.style.transform = 'scale(1.5)';
        }}
        onMouseUp={(cursorElement, shapeElement) => {
          shapeElement.style.transform = 'scale(1)';
        }}
      />
    </div>
  );
}
```

## Props

Flexible component API for customisations to suit your needs

| Prop          | Type     | Description                                                                                        | Default  |
| ------------- | -------- | -------------------------------------------------------------------------------------------------- | -------- |
| `size`        | number   | rgb value                                                                                          | `40`     |
| `color`       | string   | rgb value                                                                                          | `1`      |
| `opacity`     | number   | amount of alpha transparency for outer cursor dot                                                  | `red`    |
| `radius`      | number   | Size (px) of inner cursor dot                                                                      | `50%`    |
| `zIndex`      | number   | Size (px) of outer cursor outline                                                                  | `999999` |
| `className`   | string   | amount dot scales on click or link hover                                                           | `-`      |
| `onMouseDown` | function | Callback that fires on a `window.mousedown` event.<br />e.g. `(cursorElement, shapeElement) => {}` | `-`      |
| `onMouseUp`   | function | Callback that fires on a `window.mouseup` event.<br />e.g. `(cursorElement, shapeElement) => {}`   | `-`      |

---

License: MIT<br/>
Author: [@samwyness](https://github.com/samwyness)
