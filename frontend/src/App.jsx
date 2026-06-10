import { useState } from "react";
import axios from "axios";

function App() {

  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);

  async function analyzeSymptoms() {

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      {
        symptoms: symptoms
      }
    );

    setResult(response.data);

  }

  return (

    <div>

      <h1>Doctor AI</h1>

      <input
        type="text"
        placeholder="Enter symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button onClick={analyzeSymptoms}>
        Analyze
      </button>

      {result && (

        <div>

          <h2>Condition</h2>
          <p>{result.condition}</p>

          <h2>Severity</h2>
          <p>{result.severity}</p>

          <h2>Specialist</h2>
          <p>{result.specialist}</p>

          <h2>Diagnosis</h2>
          <p>{result.diagnosis}</p>

        </div>

      )}

    </div>

  );
}

export default App;