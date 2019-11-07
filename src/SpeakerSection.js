import React, { useState, useEffect } from "react";
import Axios from "axios";

function SpeakerSection(props) {
  //const [dataObjectState, setDataObjectState] = useState([]);
  const [speakerObjectState, setSpeakerObjectState] = useState([]);
  /*   axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=*apikeyhere*&language=en-US&page=1`)
  .then(res => {
    const posts = res.data.results.map(obj => ({title: obj.title, overview: obj.overview}));
    this.setState({ posts });
  });
} */

  const uname = "appdemo";
  const pass = "en kort demo";

  useEffect(() => {
    Axios.get(
      `https://planet9test.neptune-software.com:8081/api/entity/festival-speakers`,

      {
        auth: {
          username: uname,
          password: pass
        }
      }
    )
      .then(res => {
        setSpeakerObjectState(res.data);
      })
      .catch(console.error);
  }, []);

  console.log("Data in state: ", speakerObjectState);

  //let content = dataObjectState.Array.prototype.map()(speaker => speaker.id);

  //console.log("content:", content);

  return (
    <div className="App">
      <div>This is frontend for a change m8!</div>
      <p>{props.title}</p>
      <div>
        {speakerObjectState.map(it => (
          <ul>
            <li key={`${it.id}-name`}>{it.name}</li>
            <li key={`${it.id}-description`}>{it.description}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SpeakerSection;
