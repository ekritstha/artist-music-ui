import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

export default function MusicForm() {
  const navigate = useNavigate();
  let { artist_id, id } = useParams();
  const [music, setMusic] = useState({
    id: null,
    artist_id: artist_id,
    title: "",
    album_name: "",
    genre: "",
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/music/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setMusic(data.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (music.id) {
      axiosClient
        .put(`/music/${music.id}`, music)
        .then(({ data }) => {
          if (data.code == 0) {
            setErrors(data.message);
          } else {
            setNotification("Music was successfully updated");
            navigate(`/artists/${artist_id}/music`);
          }
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/music", music)
        .then(({ data }) => {
          if (data.code == 0) {
            setErrors(data.message);
          } else {
            setNotification("Music was successfully created");
            navigate(`/artists/${artist_id}/music`);
          }
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {music.id && <h1>Update Music: {music.title}</h1>}
      {!music.id && <h1>New Music</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            <p>{errors}</p>
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              className="text-input"
              value={music.title}
              onChange={(e) => setMusic({ ...music, title: e.target.value })}
              placeholder="Title"
            />
            <input
              className="text-input"
              value={music.album_name}
              onChange={(e) =>
                setMusic({ ...music, album_name: e.target.value })
              }
              type="text"
              placeholder="Album Name"
            />
            <select
              className="text-input"
              value={music.genre}
              onChange={(e) => setMusic({ ...music, genre: e.target.value })}
              type="text"
              placeholder="Genre"
            >
              <option>Select a Genre</option>
              <option value="rnb">R&B</option>
              <option value="country">Country</option>
              <option value="classic">Classic</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
            </select>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
