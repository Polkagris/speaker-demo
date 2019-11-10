import React, { useState, useEffect } from "react";
import Axios from "axios";
import base64 from "base-64";
import SingleSpeaker from "./SingleSpeaker";

function SpeakerSection(props) {
  const [speakerObjectState, setSpeakerObjectState] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const username = "appdemo";
  const password = "en kort demo";

  /* // CREATE
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
  }; */

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
        {speakerObjectState
          .sort((a, b) => a.position - b.position)
          .map(it => (
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

const css = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontFamily: "Montserrat"
  },
  title: {
    textAlign: "center",
    color: "black",
    width: "100%",
    fontWeight: "bold",
    fontSize: "45px",

    hover: {
      color: "red"
    }
  }
};

export default SpeakerSection;
