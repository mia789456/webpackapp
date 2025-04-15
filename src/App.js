import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0);
  const onBtnClick = () => {
    setCount(count + 1)
  }
  return <div>
    <h1>Hello React 19!DDDDDD</h1>
    <button onClick={onBtnClick}>{count}</button>
  </div>
}

export default App;