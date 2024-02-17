import "./AudioPlayer.scss";

function AudioPlayer({ selectedKirtan, play, setPlay }) {
  // let [audioEl, setAudioEl] = useState(null);

  // if (selectedKirtan.length > 0) {
  //   setAudioEl(document.getElementById("audio"));
  //   // console.log("selected kirtan");
  // }

  // console.log(audioEl);

  // useEffect(() => {
  //   if (selectedKirtan && !play) {
  //     audioEl?.play();
  //   } else if (play) {
  //     audioEl?.pause();
  //   }
  // }, [play]);

  const handleAudioPlay = () => {
    //  togglePlay(selectedKirtan);
    // console.log("handleAudioPlay");
    setPlay(true);
    // console.log("gh", true);
  };

  const handleAudioPause = () => {
    // togglePlay(selectedKirtan);
    // console.log("handleAudioPause");
    setPlay(false);
    // console.log("g1h", true);
  };

  return (
    <div className="audioplayer">
      <figure className="figure">
        {/* {play ? ( */}
        <figcaption>Listening to: {selectedKirtan.Title}</figcaption>
        {/* ) : ( */}
        {/* <></> */}
        {/* )} */}
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
