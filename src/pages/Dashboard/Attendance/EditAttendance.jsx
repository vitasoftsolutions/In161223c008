import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchSAttendance,
  updateAttendance,
} from "../../../redux/Actions/AttendanceAction";
import { fetchEmployeeAllList } from "../../../redux/Actions/employeeAction";

function EditAttendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.attendanceReducers);
  const employeeState = useSelector((state) => state.employeeReducers.data);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(employeeState, "employeeState");

  useEffect(() => {
    dispatch(fetchSAttendance(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchEmployeeAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Work Hour",
      fieldType: "number",
      fieldPlaceholder: "Work Hour",
      isRequired: true,
      hasWidth: 3,
      defaultValue: state.work_hour,
    },
    {
      fieldName: "Employee id",
      fieldType: "select",
      fieldPlaceholder: "Employee id",
      isRequired: true,
      hasWidth: 3,

      options: employeeState?.map(
        (dt, index) => (
          console.log("vl", state.employee_id, dt.id),
          {
            is_select: state.employee_id === dt.id ? "selected" : "",
            index: state.employee_id === dt.id ? index : null,
            value: dt.id,
            label: `${
              dt?.first_name === null
                ? dt.username
                : dt?.first_name + " " + dt?.last_name
            }`,
          }
        )
      ),
      defaultValue: state.employee_id
        ? employeeState?.findIndex((dt) => dt.id === state.employee_id)
        : null,

      // defaultValue: state.employee_id,
      // options: employeeState?.map((dt) => ({
      //   value: dt.id,
      //   label: `${dt?.first_name === null ? dt.username : dt?.first_name} ${
      //     dt?.last_name !== null && dt?.last_name
      //   } `,
      // })),
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        work_hour: data.work_hour ? data.work_hour : state.work_hour,
        last_name: data.last_name ? data.last_name : state.last_name,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateAttendance({
          id: state.id,
          data: updateData,
        })
      );
    }
  };

  // In a useEffect or similar, check the updated state
  useEffect(() => {
    if (reduxState.isUpdate) {
      // Perform actions after the update is successful
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
  }, [reduxState.isUpdate, navigate]);

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
          isState={state}
        />
      </div>

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
}

export default EditAttendance;
