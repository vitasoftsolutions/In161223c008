/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GoTasklist } from "react-icons/go";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { BsFillCaretDownFill, BsSearch } from "react-icons/bs";
import { RxReset } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { AiOutlinePlus } from "react-icons/ai";
import ImportModal from "../Modals/ImportModal";
import { Controller, useForm } from "react-hook-form";
import { base_url } from "../Url";
import Select from "react-select";

function TableHeader({
  title,
  redirectLink,
  url_endpoint,
  onSearch,
  onSortByDate,
  onSortByAZ,
  sortButtonText,
  model_name,
  app_label,
  formsData,
}) {
  //
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    mode: "onChange",
  });

  const { pathname } = useLocation();
  const [importModal, setImportModal] = useState(null);
  const [csvData, setCsvData] = useState("");
  //
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${base_url}${url_endpoint}`, { headers });
      const data = await response.text();
      setCsvData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadCsv = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pathname}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("No data available to download");
    }
  };

  const closeDropComp = () => {
    setIsDropdownOpen(false);
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
            : "col-span-2"
        } mb-4`}
        key={index}
      >
        <label
          htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
          className="block text-black mb-1 font-bold"
        >
          {field.fieldName}
        </label>

        {field.fieldType === "select" ? (
          <>
            <Controller
              control={control}
              {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
                required: field.isRequired,
              })}
     
              name={field?.fieldName?.toLowerCase().replace(/\s+/g, "_")}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  classNamePrefix="select"
                  options={field?.options}
                  value={
                    field.defaultValue && field.defaultValue !== null
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
   
          </>
        ) : (
          <>
            <input
              type={field.fieldType}
              {...register(
                field.fieldName.toLowerCase().replace(/\s+/g, "_"),
                {}
              )}
              placeholder={field.fieldPlaceholder}
              className="w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
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
    <div className="">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Link
            to={redirectLink}
            className="text-2xl font-bold p-1 text-erp_light rounded-full shadow-blue-200 shadow-md hover:shadow-none hover:bg-erp_blue duration-300 bg-erp_primary"
          >
            <AiOutlinePlus />
          </Link>
        </div>
        <div className="flex items-center ml-5 gap-2 w-full">
          <div className="bg-white shadow-md shadow-blue-200">
            <div className="dropdown dropdown-start">
              <label
                tabIndex={0}
                className="m-1 w-max cursor-pointer px-2 py-1 flex items-center gap-2"
              >
                <GoTasklist /> Created Data <BsFillCaretDownFill />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content rounded-none z-[1] menu p-2 shadow bg-base-100 w-max"
              >
                <li className="rounded-none">
                  <input
                    onChange={(event) => onSortByDate(event.target.value)}
                    type="date"
                    className="cursor-pointer border-none outline-none bg-transparent"
                    placeholder="Select date"
                  />
                </li>
                <li className="rounded-none">
                  <button onClick={onSortByAZ} className="rounded-none">
                    {sortButtonText}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* Search */}
          <div className="ml-4 w-full relative">
            <form onSubmit={handleSubmit(onSearch)}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white cursor-pointer h-10 text-start p-2 pl-6 pr-10 rounded-full border relative border-gray-300 w-full overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Search . . .</span>
                  {isDropdownOpen === true && (
                    <button
                      onClick={closeDropComp}
                      className="absolute text-white right-0 bg-erp_danger h-full w-10 top-0 pb-2 text-2xl"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              {/* Conditionally render the dropdown */}
              {formsData && isDropdownOpen === true && (
                <div className="absolute  grid grid-cols-4 gap-2 w-full bg-erp_light border-2 z-50 p-4">
                  {formsData?.map((field, index) => renderField(field, index))}
                  {/* buttons */}
                  <div className="flex col-span-4 justify-center gap-4">
                    <button
                      type="submit"
                      className=" flex items-center gap-2 rounded-sm bg-erp_primary text-xl text-erp_light px-4 py-2"
                    >
                      Search <BsSearch />
                    </button>
                    {/* reset */}
                    <button
                      className=" flex items-center gap-2 rounded-sm bg-erp_secondary text-xl text-erp_light px-4 py-2"
                      onClick={() => reset()}
                    >
                      Reset <RxReset />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          {/*  */}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mt-3">
        <Breadcrumb />
        <div className="flex space-x-4">
          {/* Import Button */}
          <button
            onClick={() => setImportModal("loan")}
            className="cursor-pointer bg-erp_primary shadow-lg shadow-blue-200 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaFileImport className="mr-2" /> Import
          </button>
          {/* Export Button */}
          <button
            className="bg-green-500 shadow-lg shadow-blue-200 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
            onClick={downloadCsv}
          >
            <FaFileExport className="mr-2" /> Export
          </button>
        </div>
        <ImportModal
          model_name={model_name}
          app_label={app_label}
          importModal={importModal}
          onClose={() => setImportModal(null)}
        />
      </div>
    </div>
  );
}

export default TableHeader;
