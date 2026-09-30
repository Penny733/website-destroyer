import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [destroying, setDestroying] = useState(false);
  const [phase, setPhase] = useState(0);

  const destroyWebsite = () => {
    if (!url.trim()) return;

    setDestroying(true);
    setPhase(1);
  };

  useEffect(() => {
    if (!destroying) return;

    const timers = [
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 5400),
      setTimeout(() => setPhase(5), 7200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [destroying]);

  const rebuild = () => {
    setDestroying(false);
    setPhase(0);
  };

  if (destroying) {
    return (
      <div className={`destruction-screen phase-${phase}`}>

        {/* FIRE */}
        {phase >= 3 && (
          <div className="fire-container">
            <div className="fire fire-one">🔥</div>
            <div className="fire fire-two">🔥</div>
            <div className="fire fire-three">🔥</div>
            <div className="fire fire-four">🔥</div>
          </div>
        )}

        {/* EXPLOSION */}
        {phase >= 4 && (
          <div className="explosion">
            💥
          </div>
        )}

        {/* BROWSER */}
        {phase < 5 && (
          <div className="browser-window">

            <div className="browser-bar">
              <div className="browser-buttons">
                <span className="red"></span>
                <span className="yellow"></span>
                <span className="green"></span>
              </div>

              <div className="browser-url">
                {url}
              </div>
            </div>

            <div className="website-preview">

              <div className="website-header">
                <div className="logo">
                  {url.replace(/^https?:\/\//, "").split(".")[0]}
                </div>

                <div className="nav">
                  HOME &nbsp;&nbsp; ABOUT &nbsp;&nbsp; CONTACT
                </div>
              </div>

              <h2>
                Welcome to {url.replace(/^https?:\/\//, "")}
              </h2>

              <p>
                This perfectly innocent website is about to experience
                something deeply unnecessary.
              </p>

              <div className="fake-content">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

            </div>
          </div>
        )}

        {/* STATUS */}
        {phase < 5 && (
          <div className="destruction-status">

            {phase === 1 && "⚠️ INFILTRATING WEBSITE..."}
            {phase === 2 && "💻 CORRUPTING EVERYTHING..."}
            {phase === 3 && "🔥 SETTING WEBSITE ON FIRE..."}
            {phase === 4 && "💥 DESTROYING..."}
            
          </div>
        )}

        {/* FINAL SCREEN */}
        {phase >= 5 && (
          <div className="destroyed-screen">

            <div className="skull">
              💀
            </div>

            <h1>
              WEBSITE
              <span>DESTROYED.</span>
            </h1>

            <p>
              {url}
            </p>

            <div className="progress">
              <div className="progress-fill"></div>
            </div>

            <strong>DESTRUCTION: 100%</strong>

            <button onClick={rebuild}>
              🔄 REBUILD WEBSITE
            </button>

          </div>
        )}

      </div>
    );
  }

  return (
    <div className="app">

      <div className="noise"></div>

      <main className="hero">

        <p className="eyebrow">
          ⚠️ COMPLETELY UNNECESSARY TECHNOLOGY
        </p>

        <h1>
          DESTROY
          <span> ANY WEBSITE.</span>
        </h1>

        <p className="subtitle">
          Enter a website. Press the button. Watch everything fall apart.
        </p>

        <div className="destroy-box">

          <div className="input-row">

            <span className="url-prefix">
              https://
            </span>

            <input
              type="text"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  destroyWebsite();
                }
              }}
            />

            <button onClick={destroyWebsite}>
              💀 DESTROY IT
            </button>

          </div>

        </div>

        <p className="disclaimer">
          No websites will actually be harmed. Probably.
        </p>

      </main>

    </div>
  );
}

export default App;