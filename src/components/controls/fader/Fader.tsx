import './Fader.scss';

function Fader(props: { orientation?: string }) {
  return (
    <div className={`fader-root ${props.orientation ?? 'vertical'}`}>
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
