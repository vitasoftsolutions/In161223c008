import { useState } from "react";
import { FaEye, FaFilePen, FaTrashCan } from "react-icons/fa6";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatDate } from "../../../hooks/formatDate";
import DetailsModal from "../Modals/DetailsModal";
import Loader from "../Loader/Loader";

const GlobalTable = ({
  t_head,
  handlePageChange,
  current_page,
  page_number,
  t_data,
  deleteFunction,
  editLink,
  allDataList,
  erp_modalCol,
  photoSection,
  nidSection,
}) => {
  const [allData, setAllData] = useState(null);

  if (t_data?.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <Loader text={"Gating data..."} />
      </div>
    );
  }

  const handelDelete = (id) => {
    deleteFunction(id);
  };

  // Modal data
  const getModalData = (id) => {
    const foundObject = allDataList.find((item) => item.id === id);
    setAllData(foundObject);
  };

  return (
    <div className="container mx-auto border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="overflow-x-auto flex flex-col min-h-[60vh]">
        {/*  */}
        <table className="table table-xs table_border table-compact w-full">
          {/* t head */}
          <thead>
            <tr className="">
              {/* <th className="pl-6 pt-4 pb-2">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs rounded-none"
                  />
                </label>
              </th> */}
              {t_head?.map((th, index) => (
                <th key={index} className="text-[14px] pt-4 pb-2 pl-10">
                  {th.name}
                </th>
              ))}
            </tr>
          </thead>
          {t_data?.data?.length === 0 && (
            <span className="absolute flex justify-center items-center w-full text-center min-h-[45vh]">
              <span className="flex flex-col bg-gray-200 px-5 rounded-full">
                <img
                  src="./no_data.svg"
                  alt=""
                  width={100}
                  className="opacity-50"
                />
                <p className="my-2 font-bold text-gray-500">No data</p>
              </span>
            </span>
          )}
          <tbody className="relative">
            {t_data?.data?.map((t_dt) => {
              return (
                // row
                <tr key={t_dt.id} className="w-full border-b-[1px]">
                  {/* <th className="pl-6">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs rounded-none"
                      />
                    </label>
                  </th> */}
                  {Object.keys(t_dt).map(
                    (key, index) =>
                      key !== "id" &&
                      key !== "status" && (
                        <td key={index} className="text-[14px] pl-10">
                          {key === "date" && t_dt[key] ? (
                            formatDate(t_dt[key])
                          ) : key === "image" ? (
                            <span className="flex items-center space-x-3">
                              <span className="avatar">
                                <span className="mask mask-circle w-10 h-10">
                                  <img
                                    src={t_dt[key]}
                                    alt={t_dt.first_name + " " + t_dt.last_name}
                                  />
                                </span>
                              </span>
                            </span>
                          ) : (
                            // Handle other data types as needed
                            t_dt[key]
                          )}
                        </td>
                      )
                  )}
                  {t_dt.status && (
                    <td className="">
                      <span
                        className={`${
                          t_dt.status === true
                            ? "text-erp_success"
                            : "text-erp_danger"
                        } px-3 py-1 rounded-full max-w-fit flex justify-center items-center bg-blue-50 font-bold`}
                      >
                        {t_dt.status === true ? "active" : "inactive"}
                      </span>
                    </td>
                  )}
                  <td>
                    <span className="flex gap-3 items-center text-lg">
                      <span className="text-erp_info">
                        <button
                          onClick={() => {
                            getModalData(t_dt.id);
                          }}
                        >
                          <FaEye />
                        </button>
                      </span>
                      <span className="text-erp_success">
                        <Link
                          to={editLink}
                          state={t_dt.id}
                          className="cursor-pointer"
                        >
                          <FaFilePen />
                        </Link>
                      </span>
                      <span className="text-erp_danger">
                        <button onClick={() => handelDelete(t_dt.id)}>
                          <FaTrashCan />
                        </button>
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
        </table>

        {/* Pagination */}
        <div className="border-t-2 flex justify-center py-1 mt-auto">
          <div className="join flex gap-2 rounded-none py-4">
            <button
              onClick={() => handlePageChange(current_page - 1)}
              disabled={current_page === 1}
              className="join-item btn btn-xs"
            >
              <AiOutlineLeft />
            </button>
            {page_number?.map((num, index) => {
              return (
                <button
                  onClick={() => handlePageChange(num)}
                  key={index}
                  className={`${
                    current_page === num
                      ? "bg-erp_primary px-2 text-erp_light rounded-none"
                      : "join-item btn btn-xs"
                  }`}
                  disabled={current_page === num}
                >
                  {num}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(current_page + 1)}
              disabled={
                current_page === t_data.totalPages || t_data.totalPages <= 0
              }
              className="join-item btn btn-xs"
            >
              <AiOutlineRight />
            </button>
          </div>
        </div>
        {/* Pagination */}

        {/*  */}
        <DetailsModal
          allData={allData}
          onClose={() => setAllData(null)}
          erp_modalCol={erp_modalCol}
          photoSection={photoSection}
          nidSection={nidSection}
        />

        {/*  */}
      </div>
    </div>
  );
};

export default GlobalTable;
