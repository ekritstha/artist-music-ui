import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function ArtistForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [artist, setArtist] = useState({
    id: null,
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, _setStartDate] = useState(new Date());
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/artists/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setArtist(data.data);
          console.log(artist);
          _setStartDate(new Date(data.data.dob));
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const setStartDate = (date) => {
    _setStartDate(date);
    setArtist({ ...artist, dob: moment(date).format("YYYY-MM-DD") });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (artist.id) {
      axiosClient
        .put(`/artists/${artist.id}`, artist)
        .then(({ data }) => {
          if (data.code == 0) {
            setErrors(data.message);
          } else {
            setNotification("Artist was successfully updated");
            navigate("/artists");
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
        .post("/artists", artist)
        .then(({ data }) => {
          if (data.code == 0) {
            setErrors(data.message);
          } else {
            setNotification("Artist was successfully created");
            navigate("/artists");
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
      {artist.id && <h1>Update Artist: {artist.name}</h1>}
      {!artist.id && <h1>New Artist</h1>}
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
              value={artist.name}
              onChange={(e) => setArtist({ ...artist, name: e.target.value })}
              placeholder="Name"
            />
            <DatePicker
              className="text-input"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
            <select
              className="text-input"
              value={artist.gender}
              onChange={(e) => setArtist({ ...artist, gender: e.target.value })}
              type="text"
              placeholder="Gender"
            >
              <option>Select Gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Others</option>
            </select>
            <input
              className="text-input"
              value={artist.address}
              onChange={(e) =>
                setArtist({ ...artist, address: e.target.value })
              }
              type="text"
              placeholder="Address"
            />
            <input
              className="text-input"
              value={artist.first_release_year}
              onChange={(e) =>
                setArtist({ ...artist, first_release_year: e.target.value })
              }
              type="number"
              placeholder="First Release Year"
            />
            <input
              className="text-input"
              value={artist.no_of_albums_released}
              onChange={(e) =>
                setArtist({ ...artist, no_of_albums_released: e.target.value })
              }
              type="number"
              placeholder="No of Albums Released"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
