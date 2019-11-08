import React, { useState } from "react";
import base64 from "base-64";

function SingleSpeaker(props) {
  const [nameIsClicked, setNameIsClicked] = useState(false);
  const [descriptionIsClicked, setDescriptionIsClicked] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const { speaker } = props;

  const username = "appdemo";
  const password = "en kort demo";

  // NAME
  const handleNameClick = () => {
    setNameIsClicked(!nameIsClicked);
    console.log(nameIsClicked);
  };

  const updateNameHandler = () => {
    console.log("updated!");
    setNameIsClicked(!nameIsClicked);
    updateSpeaker();
    props.getAllSpeakers();
  };

  const onNameChangeHandler = e => {
    setNameInput(e.target.value);
  };

  // DESCRIPTION
  const handleDescriptionClick = () => {
    setDescriptionIsClicked(!descriptionIsClicked);
    console.log(descriptionIsClicked);
  };

  const updateDescriptionHandler = () => {
    console.log("updated!");
    setDescriptionIsClicked(!descriptionIsClicked);
    updateSpeaker();
    props.getAllSpeakers();
  };

  const onDescriptionChangeHandler = e => {
    setDescriptionInput(e.target.value);
  };

  const updateSpeaker = () => {
    const queryString = encodeURI(`{"id":"${speaker.id}"}`);
    let headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );

    fetch(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers?where=${queryString}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: nameInput || speaker.name,
          description: descriptionInput || speaker.description
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Basic " + base64.encode(username + ":" + password)
        }
      }
    ).then(response => {
      console.log("Response inside update speaker:", response);
      return response.json();
    });
  };

  return (
    <div>
      <div>{speaker.id}</div>
      <div onClick={handleNameClick}>{speaker.name || "undefined"}</div>
      {nameIsClicked ? (
        <div>
          <input
            type="text"
            placeholder="name"
            onChange={onNameChangeHandler}
          />
          <button onClick={updateNameHandler}>Update</button>
        </div>
      ) : (
        false
      )}
      <div onClick={handleDescriptionClick}>
        {speaker.description || "undefined"}
      </div>
      {descriptionIsClicked ? (
        <div>
          <input
            type="text"
            placeholder="name"
            onChange={onDescriptionChangeHandler}
          />
          <button onClick={updateDescriptionHandler}>Update</button>
        </div>
      ) : (
        false
      )}
    </div>
  );
}

export default SingleSpeaker;
