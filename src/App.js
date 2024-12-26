import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const DRUM_PADS = [
  { key: "Q", id: "Heater-1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Clap.mp3" },
  { key: "D", id: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Open-HH.mp3" },
  { key: "Z", id: "Kick-n-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

function App() {
  const [display, setDisplay] = useState("");

  const playSound = (key, id) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
    setDisplay(id);
  };

  // handleKeyPress funksiyasini useCallback bilan o'rab olish
  const handleKeyPress = useCallback(
    (e) => {
      const drumPad = DRUM_PADS.find((pad) => pad.key === e.key.toUpperCase());
      if (drumPad) playSound(drumPad.key, drumPad.id);
    },
    [] // Bu yerda bo'sh dependency array ishlatilmoqda
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]); // handleKeyPress dependency sifatida kiritildi

  return (
    <div id="drum-machine">
      <div id="display">{display || "Play a sound"}</div>
      <div className="drum-pads">
        {DRUM_PADS.map((pad) => (
          <button
            key={pad.key}
            id={pad.id}
            className="drum-pad"
            onClick={() => playSound(pad.key, pad.id)}
          >
            {pad.key}
            <audio id={pad.key} className="clip" src={pad.src}></audio>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
