import { useState } from "react";
import axios from "axios";

import DebateCard from "./components/DebateCard";
import ModeratorCard from "./components/ModeratorCard";

function App() {

  const [problem, setProblem] = useState("");
  const [mode, setMode] = useState("debate");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {

    if (!problem) return;

    try {

      setLoading(true);

      // IMPORTANT FIX
      setResponse(null);

      const res = await axios.post(
        //`http://localhost:5000/api/${mode}`,
        `${import.meta.env.VITE_API_URL}/api/${mode}`,
        { problem }
      );

      console.log(res.data);
      setResponse(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8 text-center">
        Philosopher AI 🧠
      </h1>

      <div className="max-w-4xl mx-auto">

        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe your problem..."
          className="w-full h-40 p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-lg"
        />

        {/* MODE BUTTONS */}

        <div className="flex gap-4 mt-6 justify-center">

          <button
            onClick={() => setMode("philosophy")}
            className={`px-6 py-3 rounded-2xl transition ${
              mode === "philosophy"
                ? "bg-blue-600"
                : "bg-zinc-800"
            }`}
          >
            Philosophy
          </button>

          <button
            onClick={() => setMode("conflict")}
            className={`px-6 py-3 rounded-2xl transition ${
              mode === "conflict"
                ? "bg-blue-600"
                : "bg-zinc-800"
            }`}
          >
            Conflict
          </button>

          <button
            onClick={() => setMode("debate")}
            className={`px-6 py-3 rounded-2xl transition ${
              mode === "debate"
                ? "bg-blue-600"
                : "bg-zinc-800"
            }`}
          >
            Debate
          </button>

        </div>

        {/* ANALYZE BUTTON */}

        <div className="flex justify-center">

          <button
            onClick={handleSubmit}
            className="mt-8 px-8 py-4 bg-green-600 rounded-2xl text-lg font-semibold hover:bg-green-500 transition"
          >
            Analyze
          </button>

        </div>

        {/* LOADING */}

        {loading && (
          <p className="mt-8 text-center text-zinc-400">
            Philosophers are thinking...
          </p>
        )}

        {response?.error && (

          <div className="mt-8 bg-red-900 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-2">
              Error
            </h2>

            <p>{response.error}</p>

          </div>

        )}

        {/* DEBATE UI */}

        
        {response &&
        mode === "debate" &&
        typeof response === "object" && (

          <div className="mt-12">

            <div className="grid md:grid-cols-3 gap-6">

            <div>

              <DebateCard
                title="Stoic"
                content={response.stoic}
                critique={response?.stoicCritique || ""}
                critiqueTitle="Nietzsche attacks Stoicism"
                critiqueColor="border-red-700 bg-red-950"
                delay={0}
              />
            </div>

            {/* BUDDHIST */}

            <div>

              <DebateCard
                title="Buddhist"
                content={response.buddhist}
                critique={response.buddhistCritique || ""}
                critiqueTitle="Buddhist perspective"
                critiqueColor="border-yellow-700 bg-yellow-950"
                delay={0.3}
              />

            </div>

            {/*Nitzche*/}

            <div>

              <DebateCard
                title="Nietzsche"
                content={response.nietzsche}
                critique={response.nietzscheCritique || ""}
                critiqueTitle="Stoic attacks Nietzsche"
                critiqueColor="border-blue-700 bg-blue-950"
                delay={0.6}
              />

            </div>

          </div>

            {response?.moderator && (

              <ModeratorCard
                content={response.moderator}
              />

            )}
            {response?.alignment &&
             typeof response.alignment === "object" && (
              <div className="mt-10 bg-zinc-900 p-8 rounded-2xl border border-zinc-700">

                <h2 className="text-3xl font-bold mb-6">
                  Philosophy Alignment
                </h2>

                <div className="space-y-6">

                  {/* STOIC */}

                  <div>

                    <div className="flex justify-between mb-2">

                      <span>🟦 Stoic</span>

                      <span>
                        {response.alignment.stoic}%
                      </span>

                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-4">

                      <div
                        className="bg-blue-500 h-4 rounded-full"
                        style={{
                          width: `${response.alignment.stoic}%`
                        }}
                      />

                    </div>

                  </div>

                  {/* BUDDHIST */}

                  <div>

                    <div className="flex justify-between mb-2">

                      <span>🟩 Buddhist</span>

                      <span>
                        {response.alignment.buddhist}%
                      </span>

                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-4">

                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{
                          width: `${response.alignment.buddhist}%`
                        }}
                      />

                    </div>

                  </div>

                  {/* NIETZSCHE */}

                  <div>

                    <div className="flex justify-between mb-2">

                      <span>🟥 Nietzsche</span>

                      <span>
                        {response.alignment.nietzsche}%
                      </span>

                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-4">

                      <div
                        className="bg-red-500 h-4 rounded-full"
                        style={{
                          width: `${response.alignment.nietzsche}%`
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* PHILOSOPHY UI */}

        
        {response &&
          mode === "philosophy" &&
          typeof response === "object" && (


          <div className="grid md:grid-cols-3 gap-6 mt-12">

            {console.log("PHILOSOPHY RESPONSE:", response)}

            {Object.entries(response).map(
              ([key, value], index) => (

              <DebateCard
                key={key}
                title={key}
                content={value}
                delay={index * 0.2}
              />

            ))}

          </div>
        )}

        {/* CONFLICT UI */}

        {response && mode === "conflict" && (

          <div className="mt-12 bg-zinc-900 p-8 rounded-2xl border border-zinc-700">

            <h2 className="text-3xl font-bold mb-6">
              Inner Conflict Analysis
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-400">
                  {response.voiceA?.name}
                </h3>

                <p>
                  <strong>Fear:</strong> {response.voiceA?.fear}
                </p>

                <p className="mt-2">
                  <strong>Desire:</strong> {response.voiceA?.desire}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-red-400">
                  {response.voiceB?.name}
                </h3>

                <p>
                  <strong>Fear:</strong> {response.voiceB?.fear}
                </p>

                <p className="mt-2">
                  <strong>Desire:</strong> {response.voiceB?.desire}
                </p>
              </div>

            </div>

            <div className="mt-8">

              <h3 className="text-2xl font-semibold mb-3">
                Core Conflict
              </h3>

              <p className="text-zinc-300 leading-7">
                {response.coreConflict}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;