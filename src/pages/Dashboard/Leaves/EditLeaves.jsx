import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { fetchLeaves, updateLeaves } from "../../../redux/Actions/LeavesAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchEmployeeAllList } from "../../../redux/Actions/employeeAction";

function EditLeaves() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.leavesReducer);
  const employeeState = useSelector((state) => state.employeeReducers.data);
  const location = useLocation();
  const state = reduxState.sData;
  console.log(state);

  useEffect(() => {
    dispatch(fetchLeaves(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchEmployeeAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "From date",
      fieldType: "date",
      fieldPlaceholder: "From date",
      isRequired: true,
      defaultValue: state.from_date,
    },
    {
      fieldName: "To date",
      fieldType: "date",
      fieldPlaceholder: "To date",
      isRequired: true,
      defaultValue: state.to_date,
    },
    {
      fieldName: "Days",
      fieldType: "number",
      fieldPlaceholder: "Days",
      isRequired: true,
      defaultValue: state.days,
    },
    {
      fieldName: "Leave Type",
      fieldType: "text",
      fieldPlaceholder: "Leave Type",
      isRequired: true,
      defaultValue: state.leave_type,
    },
    {
      fieldName: "Reason",
      fieldType: "text",
      fieldPlaceholder: "Reason",
      isRequired: true,
      defaultValue: state.reason,
    },

    {
      fieldName: "Employee id",
      fieldType: "select",
      fieldPlaceholder: "Employee id",
      options: employeeState?.map(
        (dt, index) => (
          // console.log("vl", state.employee_id === dt.id ? index : null),
          {
            is_select: state.employee_id === dt.id ? "selected" : "",
            index: state.employee_id === dt.id ? index : null,
            value: dt.id,
            label: `${dt?.first_name === null ? dt.username : dt?.first_name} ${
              dt?.last_name !== null && dt?.last_name
            } `,
          }
        )
      ),
      defaultValue: state.employee_id
        ? employeeState.findIndex((dt) => dt.id === state.employee_id)
        : null,
    },

  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        from_date: data.from_date ? data.from_date : state.from_date,
        to_date: data.to_date ? data.to_date : state.to_date,
        days: data.days ? data.days : state.days,
        leave_type: data.leave_type ? data.leave_type : state.leave_type,
        reason: data.reason ? data.reason : state.reason,
        employee_id: data.employee_id ? data.employee_id : state.employee_id,
        status: data.status ? data.status : state.status,
      };
      dispatch(
        updateLeaves({
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
        navigate("/leaves");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/leaves"}
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

export default EditLeaves;
