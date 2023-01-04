import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Home from './components/Home'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>一時メモ帳システム</h1>
      <Home />
    </div>
  )
}

export default App
