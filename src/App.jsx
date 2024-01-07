import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  const plusCount = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    console.log(count);
  })

  return (
    <>
      <div>vite@latest eslint</div>
      <button onClick={plusCount}>count++</button>
    </>
  )
}

export default App
