import axios from "axios";
import React, { useState } from "react";

const UploadPhoto = ({addedPhotos,onChange}) => {

  const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        try {
          const { data: filename } = await axios.post("/upload-by-link", {
            link: photoLink,
          });
          onChange((prev) => [...prev, filename.fileName]);
          // setAddedPhotos((prev) => { return [...prev, filename]});
          setPhotoLink("");
        } catch (error) {
          console.error("Error uploading photo:", error);       
        }
      }
    
      function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
    
        for (let i = 0; i < files.length; i++) {
          data.append("photos", files[i]);
        }
    
        axios.post("/upload", data, {
            headers: { "Content-Type": "multipart/form-data" }, // Fixed `headers` typo
          })
          .then((response) => {
            let { data: filename } = response;
            filename = filename[0].substring(7);
            onChange((prev) => [...prev, filename]);
          });
      }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="Add using a link....jpg"
        />
        <button onClick={addPhotoByLink} className="primary w-1/4">
          Add Photo
        </button>
      </div>

      <div className="gap-2 mt-2 grid grid-col-3 md:grid-cols-4 lg:grid-cols-6 max-h-35">
        {addedPhotos.length > 0 && addedPhotos.map((link) => (
            <div className="flex h-35" key={link}>
              {" "}
              {/* Using `link` as key for better uniqueness */}
              {/* {(link) ? <img src={'http://localhost:3000/uploads/' + link} alt="" className="rounded-2xl" /> : <h1>link not found</h1>} */}
              <img
                src={"http://localhost:3000/uploads/" + link}
                alt=""
                className="rounded-2xl w-full object-cover h-35"
              />
            </div>
          ))}
        <label className="max-h-35 cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 bg-gray-300 flex justify-center items-center gap-1">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default UploadPhoto;
