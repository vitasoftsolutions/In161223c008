import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaFilePen, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Loader from "../shared/Loader/Loader";

function DisplayProjects({
  allDataList,
  editLink,
  handlePageChange,
  current_page,
  page_number,
  tableData,
  deleteFunction,
}) {
  const handelDelete = (id) => {
    deleteFunction(id);
  };

  if (tableData?.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <Loader text={"Gating data..."} />
      </div>
    );
  }

  return (
    <div className="container border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="min-h-[60vh] grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 gap-3">
        {/* Content */}
        {allDataList?.map((dt) => {
          return (
            <div
              key={dt.id}
              className="hover-container card w-40 h-min mx-auto bg-base-100 shadow-xl hover:shadow-md duration-200 mt-5 mb-10 rounded-md"
            >
              <Link to={`/projects/${dt.id}`} state={dt}>
                <figure className="h-36 overflow-hidden bg-gray-200">
                  <img src="" alt="" />
                </figure>
              </Link>

              <div className="card-body px-3 pt-2 pb-3 relative">
                <Link to={`/projects/${dt.id}`} state={dt}>
                  <h2 className="text-lg text-start mb-2">{dt.name}</h2>
                  <div className="card-actions">
                    <div className="badge badge-outline">
                      {dt.status === true ? "Complete" : "Working"}
                    </div>
                  </div>
                </Link>

                <div className="absolute bottom-[-32px] left-0 rounded-sm bg-gray-200 shadow-xl w-40">
                  <div className="child-div flex justify-center">
                    <Link
                      to={editLink}
                      state={dt.id}
                      className="cursor-pointer justify-center flex w-1/2 text-erp_success"
                    >
                      <FaFilePen />
                    </Link>
                    <div className="divider divider-horizontal w-0 m-0 p-0"></div>
                    <button
                      className="flex justify-center w-1/2 text-erp_danger"
                      onClick={() => handelDelete(dt.id)}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="border-t-2 flex justify-center py-1 mt-auto w-full">
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
              current_page === tableData.totalPages || tableData.totalPages <= 0
            }
            className="join-item btn btn-xs"
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
      {/* Pagination */}
      {/*  */}
    </div>
  );
}

export default DisplayProjects;
