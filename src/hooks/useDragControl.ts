import { useEffect, useReducer } from 'react';

interface IDragControlState {
  dragOrigin: {
    x: number;
    y: number;
  };
  dragging: boolean;
  controlValue: number;
}

const initialState: IDragControlState = {
  dragOrigin: {
    x: NaN,
    y: NaN,
  },
  dragging: false,
  controlValue: 0.5,
};

function clamp(value: number): number {
  return Math.max(0, Math.min(value, 1));
}

function reducer(
  currentState: IDragControlState,
  update: Partial<IDragControlState>
): IDragControlState {
  if (update.controlValue) {
    update.controlValue = clamp(update.controlValue);
  }
  return {
    ...currentState,
    ...update,
  };
}

export function useDragControl(
  vertical: boolean = true,
  resetToCenter: boolean = true
): [
  boolean,
  number,
  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  () => void
] {
  const [state, updateState] = useReducer(reducer, initialState);

  useEffect(() => {
    const tryDrag = (event: MouseEvent) => {
      let e: number, o: number;
      if (vertical) {
        e = event.clientY;
        o = state.dragOrigin.y;
      } else {
        e = event.clientX;
        o = state.dragOrigin.x;
      }
      let scale = 100;
      if (vertical) {
        // account for y increasing further down the page
        scale *= -1;
      }
      const offset = (e - o) / scale;
      updateState({ controlValue: state.controlValue + offset });
    };
    const endDrag = () => {
      updateState({ dragOrigin: { x: NaN, y: NaN }, dragging: false });
    };

    if (state.dragging) {
      window.addEventListener('mousemove', tryDrag);
      window.addEventListener('mouseup', endDrag);
      return () => {
        window.removeEventListener('mousemove', tryDrag);
        window.removeEventListener('mouseup', endDrag);
      };
    }

    return;
  }, [state.dragging]);

  const beginDrag = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    if (event.button !== 0) {
      return;
    }
    updateState({
      dragOrigin: { x: event.clientX, y: event.clientY },
      dragging: true,
    });
  };

  const reset = (): void => {
    updateState({ controlValue: resetToCenter ? 0.5 : 0 });
  };
  // reset on first load
  useEffect(reset, []);

  return [state.dragging, state.controlValue, beginDrag, reset];
}
