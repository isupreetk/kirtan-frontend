import "./KirtanList.scss";
// import kirtans from "../../assets/data/kirtans.json";

function KirtanList({searchTerm, kirtans}) {

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
                {searchTerm ? kirtans.filter((kirtan) => kirtan.name.includes(searchTerm) || kirtan.artist.includes(searchTerm) || kirtan.album.includes(searchTerm))
                .map((kirtan) => {
                    return (<li className="kirtan-list__items" key={kirtan.id}>
                        <p>{kirtan.name}</p>
                        <p>{kirtan.artist}</p>
                        <p>{kirtan.duration}</p>
                        <p>{kirtan.date}</p>
                        <p>{kirtan.album}</p>
                        <button>Play</button>
                        <button>Download</button>
                    </li>)
                })
            : kirtans.map((kirtan) => {
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