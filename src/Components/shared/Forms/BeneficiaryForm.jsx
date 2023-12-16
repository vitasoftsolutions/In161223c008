import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AiOutlineCloudUpload, AiOutlineDrag } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const BeneficiaryForm = ({
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
    setValue
  } = useForm({
    defaultValues: defaultValues,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phone_number",
  });

  const [filePreviews, setFilePreviews] = useState({});
  const [fileData, setFileData] = useState({});
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});

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
    console.log(data, "data");

    const formDataWithFiles = { ...data, ...fileData };

    console.log(formDataWithFiles, "formDataWithFiles");

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
    // console.log(field.defaultValue);
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
        ) : (
          <input
            type={field.fieldType}
            {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
              required: !isState && field.isRequired,
            })}
            placeholder={field.fieldPlaceholder}
            className="w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
            defaultValue={isState && field.defaultValue}
          />
        )}
      </div>
    );
  };

  if (fields.length === 0) {
    append({ phone_number: "", name: "", relation: "" });
  }

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

        <h5 className="text-black col-span-3 font-extrabold text-start">
          Add Phone Numbers
        </h5>

        {/* Mobile Numbers */}
        <div className="mb-4 col-span-3">
          {errors.phone_number && (
            <span className="text-red-500">
              At least one phone number is required
            </span>
          )}
          <div className="">
            {fields.map((field, index) => (
              <div key={field.id} className="w-full grid grid-cols-3 gap-2">
                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor={`phone_number[${index}].number`}
                    className="block text-black mb-1 font-bold"
                  >
                    Number
                  </label>
                  <input
                    type={"number"}
                    {...register(`phone_number[${index}].number`, {
                      required: false,
                    })}
                    defaultValue={isState && field.defaultValue}
                    placeholder="Phone Number"
                    className="w-full rounded-md py-2 px-3 focus:outline-none"
                  />
                  <div className="mb-4 col-span-3">
                    {errors.phone_number && (
                      <span className="text-red-500">Add a mobile number</span>
                    )}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor={`phone_number[${index}].name`}
                    className="block text-black mb-1 font-bold"
                  >
                    Name
                  </label>
                  <input
                    {...register(`phone_number[${index}].name`, {
                      required: false,
                    })}
                    placeholder="Name"
                    className="w-full rounded-md py-2 px-3 focus:outline-none"
                  />
                  <div className="mb-4 col-span-3">
                    {errors.phone_number && (
                      <span className="text-red-500">Add Name</span>
                    )}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor={`phone_number[${index}].relation`}
                    className="block text-black mb-1 font-bold"
                  >
                    Relation
                  </label>
                  <div className="md:flex border-b-2 border-gray-400 pb-5 md:pb-0 md:border-none items-center">
                    <input
                      {...register(`phone_number[${index}].relation`, {
                        required: false,
                      })}
                      placeholder="Relation"
                      className="w-full rounded-md py-2 px-3 focus:outline-none"
                    />
                    {index > 0 && (
                      <div className="md:ml-3 text-center md:mt-0 mt-3">
                        <button
                          className="bg-red-500 text-white p-2 rounded-md"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-x"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 col-span-3">
                    {errors.phone_number && (
                      <span className="text-red-500">Add Relation</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => append({ number: "", name: "", relation: "" })}
              className="mt-2 btn mx-auto"
            >
              Add Number +
            </button>
          </div>
        </div>

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

export default BeneficiaryForm;
