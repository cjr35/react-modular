import './Fader.scss';

function Fader() {
  return (
    <div className='fader-root'>
      <div className='fader-track'>
        <div className='fader-knob-edge'>
          <div className='fader-knob-top'>
            <div className='fader-tick'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Fader;
