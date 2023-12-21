import { useState } from "react";

function AudioPlayer({ selectedKirtan }) {
  let [play, setPlay] = useState(false);
  console.log("selectedKirtan", selectedKirtan);

  return (
    <>
      <div>Audio Player</div>;
      <div>
        {setPlay ? (
          <figure>
            <figcaption>Listening to {selectedKirtan.Title}:</figcaption>
            <audio controls src={selectedKirtan.cdnpath}>
              <a href={selectedKirtan.cdnpath}> Download audio </a>
            </audio>
          </figure>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default AudioPlayer;
