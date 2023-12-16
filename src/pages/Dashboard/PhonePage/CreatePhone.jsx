import React, { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { createPhone } from "../../../redux/Actions/PhoneAction";

const formsData = [
  {
    fieldName: "First Name",
    fieldType: "text",
    fieldPlaceholder: "First Name",
    isRequired: true,
  },
  {
    fieldName: "Last Name",
    fieldType: "text",
    fieldPlaceholder: "Last Name",
    isRequired: true,
  },
  {
    fieldName: "Relation",
    fieldType: "text",
    fieldPlaceholder: "Type your relation",
    isRequired: true,
  },
  {
    fieldName: "Phone Number",
    fieldType: "number",
    fieldPlaceholder: "Type your number here",
    isRequired: true,
  },
  {
    fieldName: "Role",
    fieldType: "select",
    fieldPlaceholder: "Select a role",
    isRequired: true,
    options: [
      { value: "Contractor", label: "Contractor" },
      { value: "Suppliers", label: "Suppliers" },
      { value: "Employee", label: "Employee" },
      { value: "Land Owners", label: "Land Owners" },
      { value: "Company Owners", label: "Owner" },
      { value: "Loan Beneficaries", label: "Loan" },
    ],
  },
];

function CreatePhone() {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.phoneReducers);
  console.log(reduxState);
  let navigate = useNavigate();

  const submitFunction = (data) => {
    console.log(data, "Owner From create ");
    dispatch(createPhone(data));
  };

  // In a useEffect or similar, check the updated state
  useEffect(() => {
    if (reduxState.isCreated) {
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
        navigate("/phone");
      }, 3000);
    }

    if (reduxState.isError) {
      // Perform actions after the update is successful
      toast.error(reduxState.massage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [reduxState, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/phone"}
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

export default CreatePhone;
