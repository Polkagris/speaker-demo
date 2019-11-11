import React, { useState } from "react";

function UpdateEmail(props) {
  // PROPS NEEDED
  // speaker.email
  // updateSpeaker
  // getAllSpeakers

  // STATE NEEDED
  // setEmailInput
  // setEmailIsClicked

  // EMAIL
  const handleEmailClick = () => {
    props.setEmailIsClicked(!props.emailIsClicked);
    console.log("email is clicked");
    console.log("clicked email state:", props.emailIsClicked);
  };

  const onEmailChangeHandler = e => {
    props.setEmailInput(e.target.value);
  };
  const updateNameHandler = () => {
    props.setEmailIsClicked(!props.emailIsClicked);
    props.updateSpeaker();
    props.getAllSpeakers();
  };

  return (
    <div style={css.container}>
      <div style={css.speakerValue} onClick={handleEmailClick}>
        {props.email || "undefined"}
      </div>
      {props.emailIsClicked ? (
        <div>
          <input
            style={css.textInput}
            type="text"
            placeholder="email"
            onChange={onEmailChangeHandler}
          />
          <button style={css.inputButton} onClick={updateNameHandler}>
            Update
          </button>
        </div>
      ) : (
        false
      )}
    </div>
  );
}

const css = {
  container: {},
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
  }
};

export default UpdateEmail;
