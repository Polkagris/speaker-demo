import React, { useState, useEffect } from "react";
import Axios from "axios";
import SingleSpeaker from "./SingleSpeaker";

function SpeakerSection(props) {
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

  // For updating list
  const handleUpdatedSpeakers = () => {
    setUpdateState(false);
  };

  return (
    <div>
      <div style={css.wrapper}>
        <h3 style={css.infoText}>Click to update attributes</h3>
        {speakerObjectState
          .sort((a, b) => a.position - b.position)
          .map(it => (
            <ul>
              <SingleSpeaker
                key={it.id}
                speaker={it}
                getAllSpeakers={handleUpdatedSpeakers}
              />
            </ul>
          ))}
      </div>
    </div>
  );
}

const css = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontFamily: "Montserrat"
  },
  infoText: {
    textAlign: "center",
    color: "black",
    width: "100%",
    fontWeight: "bold",
    fontSize: "25px"
  }
};

export default SpeakerSection;
