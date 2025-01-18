import './knob.scss';
import { useDragControl } from '../../../hooks/useDragControl';

interface IKnobProps {
  size?: 'large' | 'medium' | 'small';
  resetToCenter?: boolean;
}

const minRotation = -150;
const rotationWidth = 300;

function Knob(props: IKnobProps) {
  const [turning, turnValue, beginTurn, resetRotation] = useDragControl(
    true,
    props.resetToCenter
  );
  const turnAngle = rotationWidth * turnValue + minRotation;

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
          // By applying the rotation here, we can be sure not to move the
          // shadow of the knob inappropriately.
          style={{ rotate: `${turnAngle}deg` }}
        >
          <div className='knob-tick' />
        </div>
      </div>
    </div>
  );
}
export default Knob;
