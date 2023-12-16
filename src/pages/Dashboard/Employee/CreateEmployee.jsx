import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { createEmployee } from "../../../redux/Actions/employeeAction";

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
    fieldName: "Email",
    fieldType: "email",
    fieldPlaceholder: "example@gmail.com",
    isRequired: true,
  },
  {
    fieldName: "Password",
    fieldType: "password",
    fieldPlaceholder: "Type your password here",
    isRequired: true,
  },
  {
    fieldName: "Username",
    fieldType: "text",
    fieldPlaceholder: "Type username here",
    isRequired: true,
  },
  {
    fieldName: "Nid Number",
    fieldType: "number",
    fieldPlaceholder: "Nid Number",
    isRequired: true,
  },
  {
    fieldName: "Profile Picture",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: false,
  },
  {
    fieldName: "Nid Front",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: false,
  },
  {
    fieldName: "Nid Back",
    fieldType: "file",
    fieldPlaceholder: "Upload Image",
    isRequired: false,
  },

  {
    fieldName: "Present Address",
    fieldType: "text",
    fieldPlaceholder: "Present Address (Comma Separated)",
    isRequired: true,
  },
  {
    fieldName: "Permanent Address",
    fieldType: "text",
    fieldPlaceholder: "Permanent Address (Comma Separated)",
    isRequired: true,
  },
];

function CreateEmployee() {
  const dispatch = useDispatch();
  const employeeState = useSelector((state) => state.employeeReducers);
  console.log(employeeState, "employeeState");
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createEmployee(data));
  };

  useEffect(() => {
    if (employeeState.isCreated) {
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
        navigate("/employee");
      }, 3000);
    }

    if (employeeState.isError) {
      toast.error(employeeState.data[0], {
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
  }, [
    employeeState.isError,
    employeeState.data,
    employeeState.isCreated,
    navigate,
  ]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/employee"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <BeneficiaryForm
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

export default CreateEmployee;
