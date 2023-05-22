import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";

export default function ArtistsImport() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    axiosClient
      .post("import", data)
      .then(({ data }) => {
        if (data.code == 0) {
          setErrors(data.message);
        } else {
          setNotification("Artists imported successfully");
          navigate("/artists");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <h1>Import Artists</h1>
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
              type="file"
              placeholder="File"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
