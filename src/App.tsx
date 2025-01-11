import './App.scss'
import Knob from './components/controls/knob/Knob'

function App() {
  return (
    <div>
      <Knob resetToLeft />
      <Knob size='small' />
    </div >
  )
}

export default App