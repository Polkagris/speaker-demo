import React, { useState, useEffect } from "react";
import Axios from "axios";
import base64 from "base-64";
import SingleSpeaker from "./SingleSpeaker";

function SpeakerSection(props) {
  const [speakerObjectState, setSpeakerObjectState] = useState([]);
  const [nameInputState, setNameInputState] = useState("");
  const [updateState, setUpdateState] = useState(false);

  const username = "appdemo";
  const password = "en kort demo";

  const addNewSpeaker = () => {
    let headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );

    fetch(
      "https://planet9test.neptune-software.com:8081/api/entity/festival-speakers",
      {
        headers: headers,
        method: "PUT",
        body: JSON.stringify({
          name: "Testing Testington"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(response => {
      return response.json();
    });
  };

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

  const handleUpdatedSpeakers = () => {
    setUpdateState(false);
  };

  return (
    <div className="App">
      <div>
        {speakerObjectState.map(it => (
          <ul>
            <SingleSpeaker
              speaker={it}
              getAllSpeakers={handleUpdatedSpeakers}
            />
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SpeakerSection;
