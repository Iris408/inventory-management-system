import { useState } from "react"

function App() {
  const [message, setMessage] = useState("")

  async function testApi() {
    setMessage("Button clicked, testing API")

    const response = await fetch("http://127.0.0.1:8000/items")
    const data = await response.json()
    
    setMessage(JSON.stringify(data))
  }

  return (
    <div>
      <h1>Inventory Dashboard</h1>

      <p>React + FastAPI Frontend</p>

      <button onClick={testApi}>
        Test API
      </button>

      <p>{message}</p>
    </div>
  )
}

export default App