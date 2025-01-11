import './App.scss';
import Knob from './components/controls/knob/Knob';

function App() {
  return (
    <div>
      <Knob size='small' />
      <Knob />
      <Knob size='large' />
    </div>
  );
}

export default App;
