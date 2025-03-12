import { PiPProvider } from './components/PiPWindow/PiPProvider'
import Example from './components/Example'

import './App.css'

function App() {

  return (
    <>
      <PiPProvider>
        <Example />
      </PiPProvider>
    </>
  )
}

export default App
