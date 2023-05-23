import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { Link, useParams } from "react-router-dom";

export default function ArtistMusicList() {
  let { artist_id } = useParams();
  const [music, setMusic] = useState([]);
  const [artist, setArtist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getArtist();
    getMusic(currentPage);
  }, [currentPage]);

  const getArtist = () => {
    setLoading(true);
    axiosClient
      .get(`/artists/${artist_id}`)
      .then(({ data }) => {
        setLoading(false);
        setArtist(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getMusic = (page = 1) => {
    setLoading(true);
    axiosClient
      .get(`/music/artists/${artist_id}?page=${page}`)
      .then(({ data }) => {
        setLoading(false);
        setMusic(data.data.data);
        setCurrentPage(Number(data.data.current_page));
        setTotalPages(Number(data.data.last_page));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onDeleteClick = (music) => {
    if (!window.confirm("Are you sure you want to delete this music?")) {
      return;
    }
    axiosClient.delete(`/music/${music.id}`).then(() => {
      setNotification("Music was successfully deleted");
      getMusic(currentPage);
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Music of Artist: {artist.name}</h1>
        <Link className="btn-add" to={`/artists/${artist_id}/music/new`}>
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Album Name</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {music.map((m) => (
                <tr key={m.id}>
                  <td>{m.title}</td>
                  <td>{m.album_name}</td>
                  <td>{m.genre}</td>
                  <td>
                    <Link
                      className="btn-edit"
                      to={`/artists/${artist_id}/music/${m.id}"`}
                    >
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(e) => onDeleteClick(m)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="pagination-container">
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="current-page">Page {currentPage}</span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
