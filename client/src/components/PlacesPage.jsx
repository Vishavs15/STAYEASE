import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();
  console.log("Action Param:", action);

  return (
    <div>
      {action !== "new" && (
        <div className="mt-7 flex justify-center">
          <Link
            to="/account/places/new"
            className="bg-primary text-white rounded-full py-3 px-5 flex flex-row gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>

            <h2 className="text-xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              title shoud be Short and catchy as in advertisment
            </p>
            <input type="text" placeholder="Enter name of your place" />

            <h2 className="text-xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">
              title shoud be Short and catchy as in advertisment
            </p>
            <input type="text" placeholder="Enter address of your place" />

            <h2 className="text-xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">
              Add description about your place
            </p>
            <textarea className=""/>

            <h2 className="text-xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">more = better</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Add using a link....jpg" />
              <button className="primary w-1/4">Add Photo</button>
            </div>
            <div className="mt-2 grid grid-col-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-2xl p-8  text-2xl text-gray-600 bg-gray-300 flex justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </button>
            </div>

            <h2 className="text-xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all available perks to add them in your place
            </p>

          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
