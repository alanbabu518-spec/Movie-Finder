import Navbar from "../components/Navbar";

function Watchlist({ watchlist }) {
    console.log(watchlist)

    return (
        <>
            <Navbar />
            <div className="table" style={{ color: 'white', paddingTop: '100px', paddingLeft: '40px' }}>
                <h1>My Watchlist</h1>
                <table className="list"
                    border='1'
                    cellPadding='5'
                    style={{ width: '100%', marginTop: '20px' }}>


                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {watchlist.map((movie, index) => {
                            return (
                                <tr key={index}>
                                    <td><img src={movie.image} alt="" width='70' /></td>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.Rating}</td>
                                    <td>{movie.Description}</td>
                                    <div className="remove" style={{paddingTop:30}}>
                                    <button onClick={() => removeMovie(index)} style={{
                                        color: '#e50914',padding: 10,margin: 0,
                                        height: 40,marginLeft:20, 
                                    }}>
                                        Remove
                                    </button>
                                    </div>
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