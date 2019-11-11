import React from "react";
import "./HoverComponents.css";

function UpdateSpeakerValue(props) {
  const handleItemClick = () => {
    props.toggleClick(!props.isClicked);
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
      <div className="speakerAttribute" onClick={handleItemClick}>
        {props.attribute || "undefined"}
      </div>
      {props.isClicked ? (
        <div>
          <input
            style={css.textInput}
            type="text"
            placeholder={props.placeholderText}
            onChange={onItemChangeHandler}
          />
          <button className="updateButton" onClick={updateItemHandler}>
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
  }
};

export default UpdateSpeakerValue;
