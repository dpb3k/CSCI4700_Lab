import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="header">
        <p>login    logout    link2</p>
      </div>
      <div>
        <a href="https://www.mtsu.edu/urc/soar.php" target="_blank">
          <img src="https://www.mtsu.edu/urc/images/SOAR_Logo_small.png" className="logo" alt="SOAR logo" />
        </a>
         
      </div>

      <h1>Website/Lab Directory</h1>
      <input type="text" placeholder="Enter Lab department..."></input>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Search 
        </button>
        <p>
          MTSU's Lab Directory
        </p>
      </div>
      <p className="read-the-docs">
        Use the search bar or click the header at the top to navigate or click the logo to go to mtsu's website
      </p>
    </div>
  )
}

export default App
