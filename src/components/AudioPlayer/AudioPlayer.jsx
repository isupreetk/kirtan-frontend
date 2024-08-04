import "./AudioPlayer.scss";

function AudioPlayer({ selectedKirtan, play, setPlay }) {
  const handleAudioPlay = () => {
    setPlay(true);
  };

  const handleAudioPause = () => {
    setPlay(false);
  };

  return (
    <div className="audioplayer">
      <figure className="figure">
        <figcaption className="figure__caption">
          Listening to: {selectedKirtan.Title}
        </figcaption>
        {selectedKirtan.Title !== undefined ? (
          <figcaption className="figure__caption-details">
            {selectedKirtan.Sevadar}, {selectedKirtan.Album}
          </figcaption>
        ) : (
          <></>
        )}

        <audio
          id="audio"
          controls
          autoPlay
          src={selectedKirtan.cdnpath}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
        >
          <a href={selectedKirtan.cdnpath}> Download audio </a>
        </audio>
      </figure>
    </div>
  );
}

export default AudioPlayer;
