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
  };

  const updateNameHandler = () => {
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
    setDescriptionIsClicked(!descriptionIsClicked);
    updateSpeaker();
    props.getAllSpeakers();
  };

  const onDescriptionChangeHandler = e => {
    setDescriptionInput(e.target.value);
  };

  // UPDATE
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

  // DELETE
  const onDeleteClickHandler = () => {
    console.log("delete this");
    if (!window.confirm(`Are you sure you want to delete ${speaker.name}?`))
      return;
    const queryString = encodeURI(`{"id":"${speaker.id}"}`);
    let headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );

    fetch(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers?where=${queryString}`,
      {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Basic " + base64.encode(username + ":" + password)
        }
      }
    ).then(response => {
      console.log("Response inside delete speaker:", response);
      props.getAllSpeakers();
      return response.json();
    });
  };

  return (
    <div style={css.container}>
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
      <div>{speaker.position}</div>
      <button onClick={onDeleteClickHandler}>Delete</button>
    </div>
  );
}

const css = {
  container: {
    width: "400px",
    border: "1px solid black",
    padding: "5px",
    color: "white",
    backgroundColor: "gray"
  }
};

export default SingleSpeaker;
