import './App.scss';
import Knob from './components/controls/knob/Knob';

function App() {
  return (
    <div>
      <Knob />
      <Knob resetToLeft size='large' />
    </div>
  );
}

export default App;
