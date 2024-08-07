import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"
import { useState } from "react"
import LoadingCircle from "./components/LoadingCircle";

export default function App() {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple";

  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);

  async function fetchNewData() {
    console.log("SENDING");
    const promise = fetch(url);
    setIsLoading(true);

    let response = await promise;

    while (!response.ok) {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000);
      response = await fetch(url);
    }

    const fetchedData = (await response.json()).results;
    setData(fetchedData);
    setIsLoading(false);
  }

  async function startQuiz() {
    console.log(`Starting, ${started}`);
    await fetchNewData();
    setStarted(true);
  }

  if (isLoading) {
    return <LoadingCircle />
  }

  return (
    <div className="font-serif">
      {
        !started
          ?
          <Welcome start={startQuiz} />
          :
          <Quiz data={data} fetchNewData={fetchNewData} />
      }

    </div>
  )
}
