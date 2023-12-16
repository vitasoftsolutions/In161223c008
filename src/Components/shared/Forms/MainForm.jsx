import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineDrag } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const MainForm = ({
  formsData,
  defaultValue: externalDefaultValues,
  submitFunction,
  isState,
  isValue,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: externalDefaultValues || {}, // Provide a default empty object
    mode: "onChange",
  });

  const [filePreviews, setFilePreviews] = useState({});
  const [fileData, setFileData] = useState({});
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});


  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
  
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: file,
    }));
  
    // Update form state with the file data
    setValue(fieldName.toLowerCase().replace(/\s+/g, "_"), file);
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const onSubmit = (data) => {
    formsData.forEach((field) => {
      if (field.isHidden) {
        data[field.fieldName.toLowerCase().replace(/\s+/g, "_")] =
          field.defaultValue;
      }
    });

    Object.keys(data).forEach((key) => {
      if (key.includes(" ")) {
        const newKey = key.replace(/ /g, "_").toLowerCase();
        data[newKey] = data[key];
        delete data[key];
      }
    });

    const formDataWithFiles = { ...data, ...fileData };
    
    submitFunction(formDataWithFiles);
  };

  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0];

    const newFileData = { ...fileData, [fieldName]: file };

    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [fieldName]: file,
    }));

    // console.log(newFileData)

    setFileData(newFileData);
  };

  const removeFile = (fieldName) => {
    
    // Create a copy of the existing state objects
    const newFilePreviews = { ...filePreviews };
    const newFileData = { ...fileData };
    const updatedSelectedFiles = { ...selectedFiles };

    // Remove the field from the copied state objects
    delete newFilePreviews[fieldName];
    delete newFileData[fieldName];
    delete updatedSelectedFiles[fieldName];

    // Update the state with the modified objects
    setFilePreviews(newFilePreviews);
    setFileData(newFileData);
    setSelectedFiles(updatedSelectedFiles);
  };

  const renderField = (field, index) => {
    if (field.isHidden) {
      return null;
    }

    return (
      <div
        className={`${
          "hasWidth" in field && field.hasWidth
            ? `col-span-${field.hasWidth}`
            : "col-span-default"
        } mb-4`}
        key={index}
      >
        <label
          htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
          className="block text-black mb-1 font-bold"
        >
          {field.fieldName}
        </label>
        {field.fieldType === "select" && field.multiSelect ? (
          <>
            <Controller
              control={control}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"))}
              defaultValue={(isState && field.defaultValue) || []}
              name={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
              render={({ field: { onChange, value, ref } }) => (
                // console.log(field.options),
                <Select
                  isMulti
                  inputRef={ref}
                  classNamePrefix="select"
                  options={field.options}
                  value={
                    field.defaultValue !== null
                      ? field.options.map((dt) => field.options[dt.index])
                      : field.options.find((c) => c.value === value)
                  }
                  is_select
                  onChange={(val) => {
                    onChange(val?.map((option) => option.value));
                    field.defaultValue = null;
                  }}
                />
              )}
            />
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">
                {
                  errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
                    .message
                }
              </span>
            )}
          </>
        ) : field.fieldType === "select" ? (
          <>
            <Controller
              control={control}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: field.isRequired,
              })}
              defaultValue={isState ? field?.defaultValue : ""}
              name={field?.fieldName?.toLowerCase().replace(/\s+/g, "_")}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  classNamePrefix="select"
                  options={field?.options}
                  value={
                    field.defaultValue && field.defaultValue !== null && field.defaultValue !== undefined 
                      ? field?.options[field?.defaultValue]
                      : field?.options?.find((c) => c.value === value)
                  }
                  is_select
                  onChange={(val) => {
                    onChange(val.value);
                    field.defaultValue = null;
                  }}
                />
              )}
            />
            {/* {console.log("hello", field.defaultValue3)} */}
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">This field is required.</span>
            )}
          </>
        ) : field.fieldType === "file" ? (
          <div
            className={`relative border-2 border-dashed border-gray-300 p-4 ${
              dragging ? "bg-gray-100" : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) =>
              handleDrop(e, field.fieldName.toLowerCase().replace(/\s+/g, "_"))
            }
          >
            {selectedFiles[
              field.fieldName.toLowerCase().replace(/\s+/g, "_")
            ] ? (
              <div>
                <p>
                  Selected File:
                  {
                    selectedFiles[
                      field.fieldName.toLowerCase().replace(/\s+/g, "_")
                    ].name
                  }
                </p>
                <div className="w-full h-[150px] rounded-md overflow-hidden">
                  <img
                    src={URL.createObjectURL(
                      selectedFiles[
                        field.fieldName.toLowerCase().replace(/\s+/g, "_")
                      ]
                    )}
                    alt="Selected File"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="bg-red-500 text-white btn btn-sm hover:text-black p-2 rounded-md mt-2"
                  type="button"
                  onClick={() =>
                    removeFile(
                      field.fieldName.toLowerCase().replace(/\s+/g, "_")
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ) : field.defaultValue ? (
              <div>
                <p>Selected File: {field.fieldName}</p>
                <div className="w-full h-[150px] rounded-md overflow-hidden">
                  <img
                    src={field.defaultValue}
                    alt={field.fieldName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="bg-red-500 text-white btn btn-sm hover:text-black p-2 rounded-md mt-2"
                  type="button"
                  onClick={() => {
                    // Clear the image by updating the state
                    const newFileData = { ...fileData };
                    field.defaultValue = "";
                    setFileData(newFileData);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <p className="flex justify-start items-center gap-2">
                  <AiOutlineDrag /> Drag & Drop a File Here or
                </p>
                <label className="text-blue-500 cursor-pointer">
                  <span className="bg-erp_primary text-white btn btn-sm hover:bg-blue-600 p-2 rounded-md  justify-start items-center gap-2">
                    <AiOutlineCloudUpload /> Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    name={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
                    id={`fileInput_${index}`}
                    onChange={(e) =>
                      handleFileChange(
                        field.fieldName.toLowerCase().replace(/\s+/g, "_"),
                        e
                      )
                    }
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        ) : field.fieldType === "datetime-local" ? (
          <>
            <input
              type="datetime-local"
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: !isState && field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className="w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
              defaultValue={
                isState && field.defaultValue
                  ? new Date(field.defaultValue).toISOString().slice(0, 16)
                  : ""
              }
            />
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">This field is required.</span>
            )}
          </>
        ) : (
          <>
            <input
              type={field.fieldType}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: !isState && field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className="w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
              defaultValue={isState || isValue ? field.defaultValue : ""}
            />
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">This field is required.</span>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {formsData?.map((field, index) => renderField(field, index))}

        {/* Status */}
        {isState && (
          <div className="col-span-3 md:col-span-1 mb-4">
            <label
              htmlFor="statusInput"
              className="block text-black mb-1 font-bold"
            >
              Status
            </label>
            <select
              id="statusInput"
              name="status"
              {...register("status")}
              defaultValue={isState?.status}
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <div className="mb-4 col-span-3">
          <input
            type="submit"
            value="Submit"
            className="btn bg-erp_primary text-md text-white hover-bg-primary w-full"
          />
        </div>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default MainForm;
