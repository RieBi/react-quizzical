import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"
import data from "./data/test-data.json"
import { useState } from "react"

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="font-serif">
      {
        !started
          ?
          <Welcome start={() => setStarted(true)} />
          :
          <Quiz data={data} />
      }

    </div>
  )
}
