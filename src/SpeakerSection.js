import React, { useState, useEffect } from "react";
import Axios from "axios";

function SpeakerSection(props) {
  const [speakerObjectState, setSpeakerObjectState] = useState([]);
  const [nameInputState, setNameInputState] = useState("");

  const uname = "appdemo";
  const pass = "en kort demo";

  const addNewSpeaker = () => {
    console.log("clicked add:", nameInputState);
    const speakerObject = { name: { nameInputState } };
    
    fetch(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers`,
      {
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
/* 
    Axios.put(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers`,
      { speakerObject },

      {
        //mode: "no-cors",

        auth: {
          username: uname,
          password: pass
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          crossorigin: true
        }
      }
    )
      .then(res => {
        setSpeakerObjectState(res.data);
        console.log("AXIOS PUT CALL:", speakerObjectState);
      })
      .catch(console.error);
    //console.log("AXIOS PUT CALL ERROR:", speakerObjectState);
  }; */

  const handleNameChange = e => {
    console.log("input value:", e.target.value);
    setNameInputState(e.target.value);
  };

  // CREATE NEW SPEAKER - PUT
  // Input field and button
  // On button click -> Axios put call

  // OPPDATE SPEAKER - POST
  // DELETE SPEAKER - DELETE

  useEffect(() => {
    Axios.get(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers`,

      {
        auth: {
          username: uname,
          password: pass
        }
      }
    )
      .then(res => {
        setSpeakerObjectState(res.data);
      })
      .catch(console.error);
  }, []);
  /*     console.log("Data in state: ", speakerObjectState);
   */
  return (
    <div className="App">
      <div>This is frontend for a change m8!</div>
      <p>{props.title}</p>
      <label htmlFor="">
        Name
        <input type="text" onChange={handleNameChange} />
        <button onClick={addNewSpeaker}>Add</button>
      </label>

      <div>
        {speakerObjectState.map(it => (
          <ul>
            <li key={`${it.id}-name`}>{it.name}</li>
            <li key={`${it.id}-description`}>{it.description}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SpeakerSection;
