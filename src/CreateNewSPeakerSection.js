import React, { useState } from "react";
import base64 from "base-64";

function CreateNewSpeakerSection() {
  const [nameState, setNameState] = useState("");
  const username = "appdemo";
  const password = "en kort demo";

  const nameChangeHandler = e => {
    setNameState(e.target.value);
  };
  // CREATE
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
          name: nameState || "undefined"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(response => {
      return response.json();
    });
  };

  return (
    <div style={css.container}>
      <h2 style={css.title}>Create new speaker</h2>
      <div>
        <input
          style={css.inputField}
          type="text"
          placeholder="name"
          onChange={nameChangeHandler}
          required
        />
        <input style={css.inputField} type="text" placeholder="description" />
        <input style={css.inputField} type="text" placeholder="email" />
        <input style={css.inputField} type="text" placeholder="company" />
        <input style={css.inputField} type="text" placeholder="imageURL" />
        <button>Add</button>
      </div>
    </div>
  );
}

const css = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  title: {
    width: "100%",
    textAlign: "center"
  },
  inputField: {
    display: "block",
    padding: "10px 20px",
    margin: "5px"
  }
};

export default CreateNewSpeakerSection;
