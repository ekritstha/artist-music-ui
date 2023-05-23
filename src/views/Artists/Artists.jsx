import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getArtists(currentPage);
  }, [currentPage]);

  const getArtists = (page = 1) => {
    setLoading(true);
    axiosClient
      .get(`/artists?page=${page}`)
      .then(({ data }) => {
        setLoading(false);
        setArtists(data.data.data);
        setCurrentPage(Number(data.data.current_page));
        setTotalPages(Number(data.data.last_page));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDeleteClick = (artist) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) {
      return;
    }
    axiosClient.delete(`/artists/${artist.id}`).then(() => {
      setNotification("Artist was successfully deleted");
      getArtists(currentPage);
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const exportArtistsClick = () => {
    axiosClient.get("/export").then(({ data }) => {
      var fileURL = window.URL.createObjectURL(new Blob([data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "artists.csv");
      document.body.appendChild(fileLink);
      fileLink.click();
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
        <h1>Artists</h1>
        <div
          style={{
            display: "flex",
            gap: "0.7rem",
          }}
        >
          <Link className="btn-add" to="/artists/import">
            Import Artists
          </Link>
          <div className="btn-edit" onClick={exportArtistsClick}>
            Export
          </div>
          <Link className="btn-add" to="/artists/new">
            Add new
          </Link>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>First Release Year</th>
              <th>No of Albums Released</th>
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
              {artists.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.dob}</td>
                  <td>
                    {a.gender == "m"
                      ? "Male"
                      : a.gender == "f"
                      ? "Female"
                      : "Others"}
                  </td>
                  <td>{a.address}</td>
                  <td>{a.first_release_year}</td>
                  <td>{a.no_of_albums_released}</td>
                  <td>
                    <Link className="btn-add" to={`/artists/${a.id}/music`}>
                      Music
                    </Link>
                    &nbsp;
                    <Link className="btn-edit" to={"/artists/" + a.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(e) => onDeleteClick(a)}
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
