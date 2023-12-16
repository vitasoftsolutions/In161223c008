import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainForm from "../../../Components/shared/Forms/MainForm";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleEmployee,
  updateEmployee,
} from "../../../redux/Actions/employeeAction";
import { ToastContainer, toast } from "react-toastify";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";

function EditEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.employeeReducers);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state, "sattate");

  useEffect(() => {
    dispatch(fetchSingleEmployee(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "First Name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
      isRequired: true,
      defaultValue: state.first_name,
    },
    {
      fieldName: "Last Name",
      fieldType: "text",
      fieldPlaceholder: "Last Name",
      isRequired: true,
      defaultValue: state.last_name,
    },
    {
      fieldName: "Email",
      fieldType: "email",
      fieldPlaceholder: "example@gmail.com",
      isRequired: true,
      defaultValue: state.email,
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
      defaultValue: state.username,
    },
    {
      fieldName: "Nid Number",
      fieldType: "number",
      fieldPlaceholder: "Nid Number",
      isRequired: true,
      defaultValue: state.nid_number,
    },
    {
      fieldName: "Profile Picture",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      isRequired: false,
      defaultValue: state.profile_picture,
    },
    {
      fieldName: "Nid Front",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      isRequired: false,
      defaultValue: state.nid_front,
    },
    {
      fieldName: "Nid Back",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      isRequired: false,
      defaultValue: state.nid_back,
    },
    {
      fieldName: "Present Address",
      fieldType: "text",
      fieldPlaceholder: "Present Address (Comma Separated)",
      isRequired: true,
      defaultValue: state.present_address,
    },
    {
      fieldName: "Permanent Address",
      fieldType: "text",
      fieldPlaceholder: "Permanent Address (Comma Separated)",
      isRequired: true,
      defaultValue: state.permanent_address,
    },
  ];

  const submitFunction = (data) => {
    console.log(data, "From update page");
    if (state) {
      const updatedData = {
        id: state.id,
        ...data,
      };
      dispatch(updateEmployee(updatedData));
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
        navigate("/employee");
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
  }, [reduxState.isUpdate, reduxState.isError, reduxState.massage, navigate]);

  // console.log(reduxState.isUpdate, "reduxState.isUpdate");

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

export default EditEmployee;
