import { useDragControl } from '../../../hooks/useDragControl';
import './Fader.scss';

// matches explicit value in scss
const faderLength = 100;
// maximum distance the knob can actually travel
// using the full length looks unnatural
const faderTravel = faderLength - 10;

function Fader(props: { horizontal?: boolean }) {
  const [dragging, dragValue, beginDrag, resetDrag] = useDragControl(
    !props.horizontal,
    false
  );
  const knobPosition = dragValue * faderTravel - faderTravel / 2;
  const knobTranslate = props.horizontal
    ? `${knobPosition}px 0px`
    : `0px ${-knobPosition}px`;
  return (
    <div
      className={`fader-root 
        ${props.horizontal ? 'horizontal' : 'vertical'} 
        ${dragging ? 'dragging' : ''}`}
    >
      <div className='fader-track'>
        <div
          className='fader-knob-edge'
          onMouseDown={beginDrag}
          onDoubleClick={resetDrag}
          style={{ translate: knobTranslate }}
        >
          <div className='fader-knob-top'>
            <div className='fader-tick'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Fader;
