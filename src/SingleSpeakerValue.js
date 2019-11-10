import React from "react";

function SingleSpeakerValue(props) {
  return (
    <div>
      <div onClick={props.handleNameClick}>
        {props.speaker.name || "undefined"}
      </div>
      {nameIsClicked ? (
        <div>
          <input
            type="text"
            placeholder="name"
            onChange={props.onNameChangeHandler}
          />
          <button onClick={props.updateNameHandler}>Update</button>
        </div>
      ) : (
        false
      )}
    </div>
  );
}

export default SingleSpeakerValue;
