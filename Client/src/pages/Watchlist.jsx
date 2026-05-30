import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function Watchlist({ watchlist, setWatchlist }) {
    const removeMovie = (index) => {
        const updatedWatchlist = watchlist.filter(
            (_, i) => i !== index
        );
        setWatchlist(updatedWatchlist)
        toast.error("Removed from watchlist");
    };
    if (watchlist.length === 0) {

        return (
            <>
                <Navbar />
                <h2
                    style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: "120px",
                        paddingTop:"150px"
                    }}>No Movies Added Yet<br></br>Start Exploring Now</h2>
            </>
        );
    }

    return (
        <>
            <Navbar
                watchlist={watchlist}
                search=""
                setSearch={() => { }}
            />
            <div className="table" style={{ color: 'white', paddingTop: '100px', paddingLeft: '40px' }}>
                <h1 style={{ textAlign: "center", color: "red" }}>My Watchlist</h1>
                <table className="list"
                    border='1'
                    cellPadding='5'
                    style={{ width: '100%', marginTop: '20px' }}>


                    <thead style={{ color: "red" }}>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>overview</th>
                        </tr>
                    </thead>

                    <tbody>
                        {watchlist.map((movie, id) => {
                            return (
                                <tr key={id}>
                                    <td><img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" width='70' /></td>
                                    <td>{movie.title}</td>
                                    <td>{movie.genres?.map((g) => g.name).join(", ")}</td>
                                    <td>{movie.vote_average?.toFixed(1)}</td>
                                    <td>{movie.overview}</td>
                                    <td>
                                        <button onClick={() => removeMovie(id)} style={{
                                            background: '#e50914', padding: 10, margin: 0,
                                            height: 40, border: "none", color: "#fff", fontWeight: "bold",
                                            cursor: "pointer"
                                        }}>
                                            Remove
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Watchlist