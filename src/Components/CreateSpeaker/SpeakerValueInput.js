import React from "react";

function SpeakerValueInput(props) {
  return (
    <div style={css.container}>
      <div>{props.placeholderText}</div>
      <input
        style={css.inputField}
        type="text"
        placeholder={props.placeholderText}
        onChange={props.handlerFunction}
      />
    </div>
  );
}

const css = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "500px"
  },
  inputField: {
    display: "block",
    padding: "10px 40px",
    margin: "5px"
  }
};

export default SpeakerValueInput;
