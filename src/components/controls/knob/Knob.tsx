import './knob.scss';
import { useEffect, useReducer } from 'react';

interface IKnobProps {
  size?: 'large' | 'medium' | 'small';
  resetToLeft?: boolean;
}

const minRotation = -150;
const rotationWidth = 300;

function clamp(value: number): number {
  return Math.max(0, Math.min(value, 1));
}

interface ITurnState {
  origin: {
    x: number;
    y: number;
  };
  turning: boolean;
  fraction: number;
}

const initalTurnState: ITurnState = {
  origin: {
    x: NaN,
    y: NaN,
  },
  turning: false,
  fraction: 0.5,
};

function turnReducer(
  turnState: ITurnState,
  update: Partial<ITurnState>
): ITurnState {
  if (update.fraction) {
    update.fraction = clamp(update.fraction);
  }
  return {
    ...turnState,
    ...update,
  };
}

function Knob(props: IKnobProps) {
  const [turnState, updateTurnState] = useReducer(turnReducer, initalTurnState);

  // reset rotation on load
  useEffect(resetRotation, []);
  useEffect(() => {
    const tryTurn = (event: MouseEvent) => {
      let yOffset = (event.clientY - turnState.origin.y) / -100;
      updateTurnState({ fraction: turnState.fraction + yOffset });
    };
    const endTurn = () => {
      updateTurnState({ turning: false });
    };
    if (turnState.turning) {
      window.addEventListener('mousemove', tryTurn);
      window.addEventListener('mouseup', endTurn);
      return () => {
        window.removeEventListener('mousemove', tryTurn);
        window.removeEventListener('mouseup', endTurn);
      };
    } else {
      return;
    }
  }, [turnState.turning]);

  function beginTurn(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    updateTurnState({
      origin: { x: event.clientX, y: event.clientY },
      turning: true,
    });
  }

  function resetRotation(): void {
    // If resetToLeft is false or undefined, we want to reset to center
    updateTurnState({ fraction: props.resetToLeft ? 0 : 0.5 });
  }

  const turnAngle = rotationWidth * turnState.fraction + minRotation;

  return (
    <div
      className={`knob ${props.size} ${turnState.turning ? 'dragging' : ''}`}
      onMouseDown={beginTurn}
      onDoubleClick={resetRotation}
      style={{ transform: `rotate(${turnAngle}deg)` }}
    >
      <div>
        <div />
      </div>
    </div>
  );
}

export default Knob;
