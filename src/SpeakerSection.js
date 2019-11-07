import React, { useState, useEffect } from "react";
import Axios from "axios";

function SpeakerSection(props) {
  const [dataObjectState, setDataObjectState] = React.useState(undefined);

  /*  var session_url = 'http://api_address/api/session_endpoint';
  var uname = 'user';
  var pass = 'password';
  axios.post(session_url, {}, {
    auth: {
      username: uname,
      password: pass
    }
  }).then(function(response) {
    console.log('Authenticated');
  }).catch(function(error) {
    console.log('Error on Authentication');
  }); */

  var uname = "appdemo";
  var pass = "en kort demo";

  useEffect(() => {
    Axios.get(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers`,

      {
        auth: {
          username: uname,
          password: pass
        }
      }
    ).then(res => {
      const speakers = res.data;
      setDataObjectState(speakers);
      const content = dataObjectState.map(speaker => speaker.id);
    });
  }, []);
  console.log("Data: ", dataObjectState);

  console.log("content:", content);

  return (
    <div className="App">
      <div>This is frontend for a change m8!</div>
      <p>{props.title}</p>
      <div>{dataObjectState}</div>
    </div>
  );
}

export default SpeakerSection;
