import React from "react";

function SingleSpeakerUpdateValue(props) {
  return (
    <div style={css.container}>
      <input
        style={css.textInput}
        type="text"
        placeholder={props.placeholderText}
        onChange={props.onNameChangeHandler}
      />
      <button style={css.inputButton} onClick={props.updateNameHandler}>
        Update
      </button>
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

export default SingleSpeakerUpdateValue;
