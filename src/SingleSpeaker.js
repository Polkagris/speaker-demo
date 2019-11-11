import React, { useState } from "react";
import base64 from "base-64";
import UpdateSpeakerValue from "./UpdateSpeakerValue";
import "./HoverComponents.css";

function SingleSpeaker(props) {
  // States
  // name
  const [nameInput, setNameInput] = useState("");
  const [nameIsClicked, setNameIsClicked] = useState(false);
  // description
  const [descriptionInput, setDescriptionInput] = useState("");
  const [descriptionIsClicked, setDescriptionIsClicked] = useState(false);
  // email
  const [emailInput, setEmailInput] = useState("");
  const [emailIsClicked, setEmailIsClicked] = useState(false);
  // company
  const [companyInput, setCompanyInput] = useState("");
  const [companyIsClicked, setCompanyIsClicked] = useState(false);

  const { speaker } = props;

  const username = "appdemo";
  const password = "en kort demo";

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
          description: descriptionInput || speaker.description,
          email: emailInput || speaker.email,
          company: companyInput || speaker.company
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
        <UpdateSpeakerValue
          attribute={speaker.name}
          updateSpeaker={updateSpeaker}
          getAllSpeakers={props.getAllSpeakers}
          setInput={setNameInput}
          toggleClick={setNameIsClicked}
          isClicked={nameIsClicked}
          placeholderText="Name"
        />
        <UpdateSpeakerValue
          attribute={speaker.description}
          updateSpeaker={updateSpeaker}
          getAllSpeakers={props.getAllSpeakers}
          setInput={setDescriptionInput}
          toggleClick={setDescriptionIsClicked}
          isClicked={descriptionIsClicked}
          placeholderText="Description"
        />
        <UpdateSpeakerValue
          attribute={speaker.email}
          updateSpeaker={updateSpeaker}
          getAllSpeakers={props.getAllSpeakers}
          setInput={setEmailInput}
          toggleClick={setEmailIsClicked}
          isClicked={emailIsClicked}
          placeholderText="Email"
        />
        <UpdateSpeakerValue
          attribute={speaker.company}
          updateSpeaker={updateSpeaker}
          getAllSpeakers={props.getAllSpeakers}
          setInput={setCompanyInput}
          toggleClick={setCompanyIsClicked}
          isClicked={companyIsClicked}
          placeholderText="Company"
        />

        <div>{speaker.position}</div>
      </div>
      <img src={speaker.avatar} alt="avatar" style={css.image} />
      <div style={css.buttonContainer}>
        <button className="deleteButton" onClick={onDeleteClickHandler}>
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
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end"
  },
  image: {
    maxWidth: "100px",
    maxHeight: "100px",
    flex: "2 2 0"
  }
};

export default SingleSpeaker;
