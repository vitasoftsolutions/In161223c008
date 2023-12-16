import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineDrag } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const MultiStepForm = ({
  formsData,
  defaultValues,
  submitFunction,
  isState,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    setValue
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
  });
  // Style
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
    }),
    control: () => ({
      width: "100%",
      backgroundColor: "white",
      display: "flex",
      padding: "2px 5px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };
  // Style

  const [filePreviews, setFilePreviews] = useState({});
  const [fileData, setFileData] = useState({});
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  // Storing form data in a higher-level state
  const [formData, setFormData] = useState({});

  // Add a function to check if there are errors
  const hasFormErrors = Object.keys(errors).length > 0;

  // Handel Drop
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
    const formDataWithFiles = { ...data, ...fileData };
    const updatedFormData = { ...formData, ...formDataWithFiles };
    setFormData(updatedFormData);

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Check if there are errors
      if (Object.keys(errors).length === 0) {
        submitFunction(updatedFormData);
      }
    }
  };

  console.log(formData, "formData");

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
    const hasMinMaxValues =
      field.maxValue !== undefined && field.minValue !== undefined;
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
              styles={customStyles}
              options={field?.options}
              value={
                field.defaultValue !== null
                  ? field?.options?.map((dt) => field.options[dt.index])
                  : field?.options?.find((c) => c.value === value)
              }
              is_select
              onChange={(val) => {
                onChange(val?.map((option) => option.value));
                field.defaultValue = null;
              }}
            />
          )}
        />
        ) : field.fieldType === "select" ? (
          <>
            <select
              name={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: field.isRequired,
              })}
              defaultValue={isState && field.defaultValue}
              className={`w-full border-red-600 rounded-md py-2 px-3 focus:outline-none ${
                errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {field.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">This field is required.</span>
            )}
          </>
        ) : field.fieldType === "number" && hasMinMaxValues ? (
          <>
            <input
              type="number"
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: !isState && field.isRequired,
                valueAsNumber: true,
                validate: {
                  positiveNumber: (value) =>
                    parseFloat(value) >= (field?.minValue || 0),
                  lessThanHundred: (value) =>
                    parseFloat(value) <= (field?.maxValue || 100),
                },
              })}
              placeholder={field.fieldPlaceholder}
              className={`w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none ${
                errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
                  ? "border-red-500"
                  : ""
              }`}
              defaultValue={isState && field.defaultValue}
            />
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">
                {
                  errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
                    .message
                }
              </span>
            )}
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
              ?.type === "required" && (
              <span className="text-red-600">
                {field?.fieldName} is required.
              </span>
            )}
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
              ?.type === "positiveNumber" && (
              <span className="text-red-600">
                Number must be greater than or equal to {field?.minValue || 0}.
              </span>
            )}
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
              ?.type === "lessThanHundred" && (
              <span className="text-red-600">
                Number must be less than or equal to {field?.maxValue || 100}.
              </span>
            )}
          </>
        ) : field.fieldType === "number" ? (
          <>
            {/* // Render a regular number input without validation */}
            <input
              type="number"
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: !isState && field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className={`w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none ${
                errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
                  ? "border-red-500"
                  : ""
              }`}
              defaultValue={isState && field.defaultValue}
            />
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
              ?.type === "required" && (
              <span className="text-red-600">
                {field?.fieldName} is required.
              </span>
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
        ) : (
          <>
            <input
              type={field.fieldType}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: !isState && field.isRequired,
              })}
              placeholder={field.fieldPlaceholder}
              className={`w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none ${
                errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")]
                  ? "border-red-500"
                  : ""
              }`}
              defaultValue={isState && field.defaultValue}
            />
            {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
              <span className="text-red-600">
                {field.fieldName} field is required.
              </span>
            )}
          </>
        )}
      </div>
    );
  };

  // Split formsData into pages of 15 fields each
  const itemsPerPage = 12;
  const totalPages = Math.ceil(formsData.length / itemsPerPage);
  const pageFormsData = formsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = async () => {
    // Trigger validation before proceeding to the next page
    const isValid = await trigger();
    if (currentPage < totalPages - 1 && isValid) {
      setCurrentPage(currentPage + 1);
    }
  };
  console.log(hasFormErrors, "hasFormErrors");

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {pageFormsData?.map((field, index) => renderField(field, index))}

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

        {/* Navigation buttons */}
        {/* <div> */}
        <div className="flex"></div>
        <div className="flex justify-center">
          {currentPage < totalPages - 1 ? (
            <button
              type="button"
              onClick={handleNextPage}
              className={`btn bg-blue-500 text-md text-white hover-bg-primary ${
                hasFormErrors ? "bg-gray-300 cursor-not-allowed" : "" // Disable the button if there are errors
              }`}
            >
              Next
            </button>
          ) : (
            <input
              type="submit"
              value="Submit"
              className="btn bg-erp_primary text-md text-white hover-bg-primary"
            />
          )}
          {/* </div> */}
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

export default MultiStepForm;
