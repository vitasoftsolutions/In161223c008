import { AiOutlineCloudDownload } from "react-icons/ai";
import { useState } from "react"; // Import useState from React
import { useForm } from "react-hook-form";
import axios from "axios";
import { base_url } from "../Url";

const ImportModal = ({ importModal, onClose, model_name, app_label }) => {
  const { register, handleSubmit } = useForm();
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file); // Store the selected file
    }
  };

  if (!importModal) {
    return null;
  }

  
  const onSubmit = () => {
    
    const submittedData = {
      model_name: model_name,
      app_label: app_label,
      file: selectedFile,
    };
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios PUT request with the headers and payload
    const response = axios.post(`${base_url}/upload-csv/`, submittedData, {
      headers,
    });

    console.log(response);
  };

  return (
    <dialog id="my_modal_1" className="modal bg-gray-800 bg-opacity-50" open>
      <div className="modal-box w-11/12 max-w-5xl rounded-none">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 mt-8">
          <div className="md:col-span-3 col-span-1 min-h-[50vh]">
            <div className="my-3">
              <h3 className="text-2xl font-semibold text-center">
                Upload Files
              </h3>
              <p className="text-center font-italic text-erp_success">
                <i>CSVs only</i>
              </p>
            </div>
            {/* File 1 */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="border-2 border-erp_success border-dashed text-erp_dark text-center w-full py-5 px-4 inline-flex flex-col justify-center items-center cursor-pointer"
                  htmlFor="fileInput" // Add htmlFor attribute to link label and input
                >
                  <span className="text-3xl">
                    <AiOutlineCloudDownload />
                  </span>
                  <p className="font-bold">
                    {fileName
                      ? fileName
                      : "Drop files here or click to upload."}
                  </p>
                  {/* Use standard file input element */}
                  <input
                    {...register("fileInput")}
                    type="file"
                    accept=".csv"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <input
                  type="hidden"
                  {...register("hiddenFileInput")}
                  value={selectedFile ? selectedFile.name : ""}
                />
                <div className="flex gap-2 justify-center mt-5 mb-3">
                  {/* <button
                    disabled
                    className="bg-[#5AC192] hover:bg-[#449973] duration-300 py-2 px-3 text-erp_light"
                  >
                    Merge and Upload as one file
                  </button> */}
                  <button
                    type="submit"
                    className="bg-[#5AC192] hover:bg-[#449973] duration-300 py-2 px-3 text-erp_light"
                  >
                    Save each file separately
                  </button>
                </div>
              </div>
            </form>
            {/* form */}
          </div>
          <div className="md:col-span-3 col-span-1 bg-gray-100 min-h-[50vh]"></div>
        </div>
        {/* End */}
        <div className="modal-action">
          <form method="dialog">
            <button
              className="px-6 py-2 bg-erp_primary text-erp_light rounded-sm"
              onClick={onClose}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ImportModal;
