import React, { useState } from "react";
import base64 from "base-64";
import SpeakerValueInput from "./SpeakerValueInput";

function CreateNewSpeakerSection() {
  const [nameState, setNameState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [imageUrlState, setImageUrlState] = useState("");
  const username = "appdemo";
  const password = "en kort demo";

  // For testing the object that is sent
  const speakerObject = {
    name: nameState,
    description: descriptionState,
    email: emailState,
    company: companyState,
    avatar: imageUrlState
  };

  const nameChangeHandler = e => {
    setNameState(e.target.value);
  };
  const descriptionChangeHandler = e => {
    setDescriptionState(e.target.value);
  };
  const emailChangeHandler = e => {
    setEmailState(e.target.value);
  };
  const companyChangeHandler = e => {
    setCompanyState(e.target.value);
  };
  const urlChangeHandler = e => {
    setImageUrlState(e.target.value);
  };

  const clearInputFields = () => {
    document.getElementById("speakerInputForm").reset();
  };

  // CREATE (on add click)
  const addNewSpeakerHandler = () => {
    console.log("clicked create new speaker!", speakerObject);

    let headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );
    clearInputFields();
    fetch(
      "https://planet9test.neptune-software.com:8081/api/entity/festival-speakers",
      {
        headers: headers,
        method: "PUT",
        body: JSON.stringify({
          name: nameState || "undefined",
          description: descriptionState || "undefined",
          email: emailState || "undefined",
          company: companyState || "undefined",
          avatar: imageUrlState || "undefined"
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
      <form id="speakerInputForm">
        <SpeakerValueInput
          handlerFunction={nameChangeHandler}
          placeholderText="name"
        />
        <SpeakerValueInput
          handlerFunction={descriptionChangeHandler}
          placeholderText="description"
        />
        <SpeakerValueInput
          handlerFunction={emailChangeHandler}
          placeholderText="email"
        />
        <SpeakerValueInput
          handlerFunction={companyChangeHandler}
          placeholderText="company"
        />
        <SpeakerValueInput
          handlerFunction={urlChangeHandler}
          placeholderText="ImageURL"
        />
      </form>
      <button onClick={addNewSpeakerHandler} style={css.addButton}>
        Add
      </button>
    </div>
  );
}

const css = {
  container: {
    display: "flex",
    //width: "500px",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "500px",
    maxHeight: "600px",
    margin: "0 auto"
  },
  title: {
    width: "100%",
    textAlign: "center"
  },
  inputField: {
    padding: "10px 20px",
    margin: "5px"
  },
  addButton: {
    width: "100%",
    padding: "20px",
    border: "none",
    textTransform: "uppercase",
    fontSize: "25px",
    textDecoration: "none",
    backgroundColor: "#4CFF33",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
      color: "red",
      padding: "100px"
    }
  }
};

export default CreateNewSpeakerSection;
