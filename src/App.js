import React, { useState, useEffect } from "react";
import SpeakerSection from "./Components/SpeakerSection";
import CreateNewSpeakerSection from "./Components/CreateNewSpeaker";
import Axios from "axios";

function App() {
  const [speakerObjectState, setSpeakerObjectState] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const username = "appdemo";
  const password = "en kort demo";

  // GET ALL SPEAKERS
  useEffect(() => {
    getAllSpeakers()
      .then(res => {
        setSpeakerObjectState(res.data);
        setUpdateState(true);
      })
      .catch(console.error);
  }, [updateState]);

  const getAllSpeakers = () => {
    return Axios.get(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers`,

      {
        auth: {
          username: username,
          password: password
        }
      }
    );
  };

  return (
    <div style={css.wrapper}>
      <CreateNewSpeakerSection setUpdateState={setUpdateState} />
      <SpeakerSection
        speakerObjectState={speakerObjectState}
        setUpdateState={setUpdateState}
      />
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
