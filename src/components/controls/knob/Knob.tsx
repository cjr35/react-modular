import './knob.scss';
import { useDragControl } from '../../../hooks/useDragControl';

interface IKnobProps {
  size?: 'large' | 'medium' | 'small';
  resetToCenter?: boolean;
}

const minRotation = -150;
const rotationWidth = 300;

function Knob(props: IKnobProps) {
  const [turning, turnPosition, beginTurn, resetRotation] = useDragControl(
    true,
    props.resetToCenter
  );
  const turnAngle = rotationWidth * turnPosition + minRotation;

  return (
    <div
      className={`knob-root ${props.size ?? 'medium'}${
        turning ? ' dragging' : ''
      }`}
    >
      <div
        className='knob-edge'
        onMouseDown={beginTurn}
        onDoubleClick={resetRotation}
      >
        <div
          className='knob-top'
          style={{ transform: `rotate(${turnAngle}deg)` }}
        >
          <div className='knob-tick' />
        </div>
      </div>
    </div>
  );
}
export default Knob;
