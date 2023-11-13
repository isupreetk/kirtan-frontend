import "./KirtanList.scss";
import kirtans from "../../assets/data/kirtans.json";

function KirtanList({searchTerm}) {

    return (
        <>
            <ul className="kirtan-list">
                <li className="kirtan-list__items">
                    <p>Name</p>
                    <p>Artist</p>
                    <p>Duration</p>
                    <p>Date</p>
                    <p>Album</p>
                    <p>Play</p>
                    <p>Download</p>
                </li>
                {kirtans.map((kirtan) => {
                    return (<li className="kirtan-list__items" key={kirtan.id}>
                        <p>{kirtan.name}</p>
                        <p>{kirtan.artist}</p>
                        <p>{kirtan.duration}</p>
                        <p>{kirtan.date}</p>
                        <p>{kirtan.album}</p>
                        <button>Play</button>
                        <button>Download</button>
                    </li>)
                })}
            </ul>
        </>

    )
}

export default KirtanList;