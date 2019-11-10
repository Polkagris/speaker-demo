import React, { useState } from "react";
import base64 from "base-64";
import SingleSpeakerUpdateValue from "./SingleSpeakerUpdateValue";

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
      <div style={css.speakerTextColumn}>
        <div style={css.speakerValue} onClick={handleNameClick}>
          {speaker.name || "undefined"}
        </div>
        {nameIsClicked ? (
          <div>
            <input
              style={css.textInput}
              type="text"
              placeholder="name"
              onChange={onNameChangeHandler}
            />
            <button style={css.inputButton} onClick={updateNameHandler}>
              Update
            </button>
          </div>
        ) : (
          false
        )}
        <div style={css.speakerValue} onClick={handleDescriptionClick}>
          {speaker.description || "undefined"}
        </div>
        {descriptionIsClicked ? (
          <div>
            <input
              style={css.textInput}
              type="text"
              placeholder="description"
              onChange={onDescriptionChangeHandler}
            />
            <button style={css.inputButton} onClick={updateDescriptionHandler}>
              Update
            </button>
          </div>
        ) : (
          false
        )}
        <div>{speaker.email}</div>
        <div>{speaker.company}</div>
        <div>{speaker.position}</div>
      </div>
      <img src={speaker.avatar} alt="avatar" style={css.image} />
      <div style={css.buttonContainer}>
        <button
          style={css.button}
          className="deleteButton"
          onClick={onDeleteClickHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const css = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "550px",
    minHeight: "300px",
    margin: "5px",
    border: "1px solid #A3A3A3",
    padding: "5px",
    color: "white",
    backgroundColor: "#BABABA",
    boxShadow: "20px 18px 15px -18px rgba(0,0,0,0.5)"
  },
  speakerTextColumn: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0"
  },
  speakerValue: {
    cursor: "pointer"
  },
  textInput: {
    padding: "20px",
    margin: "10px 0"
  },
  inputButton: {
    padding: "20px",
    margin: "10px 0",
    border: "none",
    textTransform: "uppercase",
    textDecoration: "none",
    backgroundColor: "#FFC725",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
      color: "red",
      padding: "100px"
    }
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end"
  },
  button: {
    width: "100%",
    height: "70px",
    padding: "20px",
    margin: "10px",
    border: "none",
    textTransform: "uppercase",
    textDecoration: "none",
    backgroundColor: "#581845",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
      color: "red",
      padding: "100px"
    }
  },
  image: {
    maxWidth: "100px",
    maxHeight: "100px",
    flex: "2 2 0"
  }
};

export default SingleSpeaker;
