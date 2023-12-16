import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createAttendance } from "../../../redux/Actions/AttendanceAction";
import { fetchEmployeeAllList } from "../../../redux/Actions/employeeAction";
import jwtDecode from "jwt-decode";

function CreateAttendance() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.attendanceReducers);
  const employeeState = useSelector((state) => state.employeeReducers.data);
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createAttendance(data));
  };

  console.log(loanState, "loanState");

  useEffect(() => {
    dispatch(fetchEmployeeAllList());
  }, [dispatch]);

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  const formsData = [
    {
      fieldName: "Work Hour",
      fieldType: "number",
      fieldPlaceholder: "Work Hour",
      isRequired: true,
      hasWidth: 3,
    },
    {
      fieldName: "Employee id",
      fieldType: "select",
      fieldPlaceholder: "Employee id",
      isRequired: true,
      hasWidth: 3,
      options: employeeState?.map((dt) => ({
        value: dt.id,
        label: `${dt?.first_name === null ? dt.username : dt?.first_name} ${
          dt?.last_name !== null && dt?.last_name
        } `,
      })),
    },
    {
      fieldName: "Author",
      fieldType: "number",
      fieldPlaceholder: "Author id",
      defaultValue: userId,
      isRequired: true,
      isHidden: true,
    },
  ];

  useEffect(() => {
    if (loanState.isCreated) {
      toast("Successfully done", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/attendance");
      }, 3000);
    }

    if (loanState.isError) {
      toast.error(loanState.data[0], {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [loanState.isError, loanState.data, loanState.isCreated, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/attendance"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
          formsData={formsData}
          submitFunction={submitFunction}
          isReset={true}
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
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
}

export default CreateAttendance;
