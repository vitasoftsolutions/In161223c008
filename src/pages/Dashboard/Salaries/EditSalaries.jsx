import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchLoanBene,
  updateLoanBeneficiary,
} from "../../../redux/Actions/loanBenAction";
import { fetchEmployeeAllList } from "../../../redux/Actions/employeeAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchSalarie, updateSalaries } from "../../../redux/Actions/salaryAction";

function EditSalaries() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.salaryReducer);
  const employeeState = useSelector((state) => state.employeeReducers.data);
  const location = useLocation();
  const state = reduxState.sData;


  useEffect(() => {
    dispatch(fetchSalarie(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchEmployeeAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Salary",
      fieldType: "number",
      fieldPlaceholder: "Salary",
      hasWidth: 3,
      isRequired: true,
      defaultValue: state.salary,
    },
    {
      fieldName: "Employee id",
      fieldType: "select",
      fieldPlaceholder: "Employee id",
      isRequired: true,
      defaultValue: state.employee_id,
      hasWidth: 3,
      options: employeeState?.map((dt) => ({
        value: dt.id,
        label: `${dt?.first_name === null ? dt.username : dt?.first_name} ${
          dt?.last_name !== null && dt?.last_name
        } `,
      })),
    },
  ];

  const submitFunction = (data) => {
   
    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        salary: data.salary ? data.salary : state.salary,
        employee_id: data.employee_id ? data.employee_id : state.employee_id,
        status: data.status ? data.status : state.status,
      };
  
      dispatch(
        updateSalaries({
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
        navigate("/beneficiarylist");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/beneficiarylist"}
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

export default EditSalaries;
