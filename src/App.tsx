import './App.scss';
import Knob from './components/controls/knob/Knob';
import Fader from './components/controls/fader/Fader';

function App() {
  return (
    <div>
      <Knob size='small' />
      <Knob />
      <Knob size='large' />
      <Fader />
    </div>
  );
}

export default App;
