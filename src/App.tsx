import './App.scss';
import Knob from './components/controls/knob/Knob';
import Fader from './components/controls/fader/Fader';
import Jack from './components/jack/Jack';

function App() {
  return (
    <div>
      <Knob size='small' />
      <Knob />
      <Knob size='large' />
      <Jack label='in' />
      <Jack output label='out' />
      <Fader />
      <Fader horizontal />
    </div>
  );
}

export default App;
