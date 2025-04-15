import { useState } from 'react'
import './a.css';
function App() {
  const [count, setCount] = useState(0);
  const onBtnClick = () => {
    setCount(count + 1)
  }
  return <div className="div-a test">
    <h1>Hello React 19!</h1>
    <button onClick={onBtnClick}>{count}</button>
  </div>
}

export default App;