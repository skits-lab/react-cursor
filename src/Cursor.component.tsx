import React, { useEffect, useMemo, useRef } from 'react';
import CursorClass from './Cursor';

type CursorProps = {
  size?: number;
  opacity?: number;
  color?: string;
  radius?: string;
  zIndex?: number;
  className?: string;
  onMouseDown?: (cursorElement: HTMLDivElement, shapeElement: HTMLDivElement) => void;
  onMouseUp?: (cursorElement: HTMLDivElement, shapeElement: HTMLDivElement) => void;
};

export const Cursor: React.FC<CursorProps> = ({
  size = 40,
  opacity = 1,
  color = 'red',
  radius = '50%',
  zIndex = 999999,
  className,
  onMouseDown,
  onMouseUp,
}) => {
  const cursorElement = useRef<HTMLDivElement>(null);
  const cursorClass = useRef<CursorClass>();

  useEffect(() => {
    if (cursorElement.current) {
      cursorClass.current = new CursorClass(cursorElement.current, onMouseDown, onMouseUp);
    }

    return () => {
      if (cursorClass.current) {
        cursorClass.current.stop();
      }
    };
  }, [onMouseDown, onMouseUp]);

  const cursorStyles: { [key: string]: React.CSSProperties } = useMemo(
    () => ({
      cursor: {
        position: 'fixed',
        pointerEvents: 'none',
        transformOrigin: 'center',
        transform: 'translate3d(-50%, -50%, 0)',
        willChange: 'transform',
        zIndex,
      },
      shape: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: radius,
        opacity,
        transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, width, height, opacity',
      },
    }),
    [color, opacity, radius, size, zIndex],
  );

  return (
    <div ref={cursorElement} style={cursorStyles.outer} className={`skits-cursor ${className}`}>
      <div style={cursorStyles.shape} className="skits-cursor__shape"></div>
    </div>
  );
};
