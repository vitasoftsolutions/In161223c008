import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaFilePen, FaTrashCan } from "react-icons/fa6";
// import LoanDetailModal from "./LoanDetailModal";
import { formatDate } from "../../hooks/formatDate";
// import EditLoanSidebar from "./EditLoanSidebar";
import Swal from "sweetalert2";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Loader from "../shared/Loader/Loader";
import { deletePhone, fetchPhoneList } from "../../redux/Actions/PhoneAction";
import DetailsModal from "../shared/Modals/DetailsModal";
import { Link } from "react-router-dom";

const PhoneListTable = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //   console.log(state)

  const [selectedDetails, setSelectedDetails] = useState(null);

  const current_page = state.phoneReducers.currentPage;
  const total_page = state.phoneReducers.totalPages;

  let page_number = [];
  for (let i = current_page - 1; i <= current_page + 1; i++) {
    if (i < 1) continue;
    if (i > total_page) break;

    page_number.push(i);
  }

  useEffect(() => {
    dispatch(fetchPhoneList(current_page));
  }, [dispatch, current_page, state.phoneReducers.isDelete]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPhoneList(newPage));
  };

  if (state.loanBeneList.isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center gap-4 items-center">
        <Loader text={"Gating data..."} />
      </div>
    );
  }

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePhone(id));
        if (state.phoneReducers.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="container mx-auto border-2 bg-white mt-5 border-gray-50 overflow-hidden shadow-md shadow-blue-200">
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs table_border dark:bg-blue-500 table-compact w-full">
            {/* head */}
            <thead>
              <tr className="">
                <th className="pl-6 pt-4 pb-2">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs rounded-none"
                    />
                  </label>
                </th>
                <th className="text-[14px] pt-4 pb-2">Name</th>
                <th className="text-[14px] pt-4 pb-2">Created Date</th>
                <th className="text-[14px] pt-4 pb-2">Relation</th>
                <th className="text-[14px] pt-4 pb-2">Phone</th>
                <th className="text-[14px] pt-4 pb-2">Status</th>
                <th className="text-[14px] pt-4 pb-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {state?.phoneReducers?.data?.map((pn) => {
                console.log(pn, "from PhoneListTable");
                return (
                  // row
                  <tr key={pn.id}>
                    <th className="pl-6">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs rounded-none"
                        />
                      </label>
                    </th>
                    <td className="text-[14px]">
                      {pn.first_name + " " + pn.last_name}
                    </td>
                    <td className="text-[14px]">{formatDate(pn.created_at)}</td>
                    <td className="text-[14px]">{pn.relation}</td>
                    <td className="text-[14px]">{pn.phone_number}</td>
                    <td className="">
                      <span
                        className={`${
                          pn.status === true
                            ? "text-erp_success"
                            : "text-erp_danger"
                        } px-3 py-1 rounded-full max-w-fit flex justify-center items-center bg-blue-50 font-bold`}
                      >
                        {pn.status === true ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3 items-center text-lg">
                        <div className="text-erp_info">
                          <button onClick={() => setSelectedDetails(pn)}>
                            <FaEye />
                          </button>
                        </div>
                        <div className="text-erp_success">
                          <Link
                            to={"/phone/editphone"}
                            state={pn}
                            className="cursor-pointer"
                          >
                            <FaFilePen />
                          </Link>
                        </div>
                        <div className="text-erp_danger">
                          <button onClick={() => handelDelete(pn.id)}>
                            <FaTrashCan />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* foot */}
          </table>
          {/* Pagination */}
          <div className="border-t-2 flex justify-center py-1">
            <div className="join flex gap-2 rounded-none py-4">
              <button
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
                className="join-item btn btn-xs"
              >
                <AiOutlineLeft />
              </button>
              {page_number.map((num) => {
                return (
                  <button
                    onClick={() => handlePageChange(num)}
                    key={num}
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
                  current_page === state.phoneReducers.totalPages ||
                  state.phoneReducers.totalPages <= 0
                }
                className="join-item btn btn-xs"
              >
                <AiOutlineRight />
              </button>
            </div>
          </div>
          {/* End Pagination */}
          {/*  */}
          <DetailsModal
            selectedDetails={selectedDetails}
            onClose={() => setSelectedDetails(null)}
            erp_modalCol = {3}
          />
          {/*  */}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default PhoneListTable;
