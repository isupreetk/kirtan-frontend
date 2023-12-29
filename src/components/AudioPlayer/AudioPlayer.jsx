import "./AudioPlayer.scss";

function AudioPlayer({ selectedKirtan, play }) {
  return (
    <div className="audioplayer">
      <figure className="figure">
        {play ? (
          <figcaption>Listening to: {selectedKirtan.Title}</figcaption>
        ) : (
          <></>
        )}
        <audio controls autoPlay src={selectedKirtan.cdnpath}>
          <a href={selectedKirtan.cdnpath}> Download audio </a>
        </audio>
      </figure>
    </div>
  );
}

export default AudioPlayer;
