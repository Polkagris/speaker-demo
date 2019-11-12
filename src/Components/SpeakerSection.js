import React from "react";
import SingleSpeaker from "./SpeakerList/SingleSpeaker";

function SpeakerSection(props) {
  // For updating speaker list
  const handleUpdatedSpeakers = () => {
    props.setUpdateState(false);
  };

  return (
    <div>
      <div style={css.wrapper}>
        <h3 style={css.infoText}>Click to update attributes</h3>
        {props.speakerObjectState
          .sort((a, b) => a.position - b.position)
          .map(it => (
            <ul>
              <SingleSpeaker
                key={it.id}
                speaker={it}
                getAllSpeakers={handleUpdatedSpeakers}
              />
            </ul>
          ))}
      </div>
    </div>
  );
}

const css = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontFamily: "Montserrat"
  },
  infoText: {
    textAlign: "center",
    color: "black",
    width: "100%",
    fontWeight: "bold",
    fontSize: "25px"
  }
};

export default SpeakerSection;
