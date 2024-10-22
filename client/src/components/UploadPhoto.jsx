import axios from "axios";
import React, { useState } from "react";

const UploadPhoto = ({ addedPhotos, onChange }) => {
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

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }, // Fixed `headers` typo
      })
      .then((response) => {
        let { data: filename } = response;
        filename = filename[0].substring(7);
        onChange((prev) => [...prev, filename]);
      });
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function coverPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
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

      <div className="gap-2 mt-2 grid grid-col-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="flex max-h-35 relative" key={link}>
              {" "}
              {/* Using `link` as key for better uniqueness */}
              {/* {(link) ? <img src={'http://localhost:3000/uploads/' + link} alt="" className="rounded-2xl" /> : <h1>link not found</h1>} */}
              <img
                src={"http://localhost:3000/uploads/" + link}
                className="rounded-2xl w-60 object-cover h-35"
              />
              <button
                onClick={ev => removePhoto(ev, link)}
                className="absolute bottom-2 right-2 text-white bg-zinc-800 p-1 rounded-md cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
              </button>
              <button
                onClick={ev => coverPhoto(ev, link)}
                className="absolute bottom-2 left-2 text-white bg-zinc-800 p-1 rounded-md cursor-pointer"
              >
                {link === addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"/>
                  </svg>
                )}

                {link !== addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="h-35 cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 bg-gray-300 flex justify-center items-center gap-1">
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
