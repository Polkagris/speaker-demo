import React from "react";
import SpeakerSection from "./Components/SpeakerSection";
import CreateNewSpeakerSection from "./Components/CreateNewSpeaker";

function App() {
  return (
    <div style={css.wrapper}>
      <CreateNewSpeakerSection />
      <SpeakerSection />
    </div>
  );
}

const css = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#F0F0F0"
  }
};

export default App;
