import React, { useState } from "react";

function UpdateSpeakerValue(props) {
  // GENERIC ATTRIBUTE
  const handleItemClick = () => {
    props.toggleClick(!props.isClicked);
    console.log("company is clicked");
    console.log("clicked company state:", props.isClicked);
  };

  const onItemChangeHandler = e => {
    props.setInput(e.target.value);
  };
  const updateItemHandler = () => {
    props.toggleClick(!props.isClicked);
    props.updateSpeaker();
    props.getAllSpeakers();
  };

  return (
    <div style={css.container}>
      <div style={css.speakerValue} onClick={handleItemClick}>
        {props.attribute || "undefined"}
      </div>
      {props.isClicked ? (
        <div>
          <input
            style={css.textInput}
            type="text"
            placeholder={props.attribute}
            onChange={onItemChangeHandler}
          />
          <button style={css.inputButton} onClick={updateItemHandler}>
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

export default UpdateSpeakerValue;
