import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { ToastContainer, toast } from "react-toastify";
import { fetchPhone, updatePhone } from "../../../redux/Actions/PhoneAction";

function PhoneDetailsEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.phoneReducers);
  const location = useLocation();
  const state = reduxState.sData;

  const roleOpt = [
    { value: "Contractor", label: "Contractor" },
    { value: "Suppliers", label: "Suppliers" },
    { value: "Employee", label: "Employee" },
    { value: "Land Owners", label: "Land Owners" },
    { value: "Company Owners", label: "Owner" },
    { value: "Loan Beneficaries", label: "Loan" },
  ];

  useEffect(() => {
    dispatch(fetchPhone(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "First Name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
      defaultValue: state.first_name,
    },
    {
      fieldName: "Last Name",
      fieldType: "text",
      fieldPlaceholder: "Last Name",
      defaultValue: state.last_name,
    },
    {
      fieldName: "Relation",
      fieldType: "text",
      fieldPlaceholder: "Type your relation",
      defaultValue: state.relation,
    },
    {
      fieldName: "Phone Number",
      fieldType: "number",
      fieldPlaceholder: "Type your number here",
      defaultValue: state.phone_number,
    },
    {
      fieldName: "Role",
      fieldType: "select",
      fieldPlaceholder: "Select a role",
      options: roleOpt?.map((dt) => ({
        value: dt.value,
        label: dt.label,
      })),
      defaultValue: state.role ? roleOpt?.findIndex((dt) => dt.value === state.role) : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      console.log(data, "From update page");
      const updatedData = {
        id: state.id,
        status: data.status ? data.status : state.status,
        first_name: data.first_name ? data.first_name : state.first_name,
        last_name: data.last_name ? data.last_name : state.last_name,
        relation: data.relation ? data.relation : state.relation,
        phone_number: data.phone_number
          ? data.phone_number
          : state.phone_number,
        role: data.role ? data.role : state.role,
      };
      dispatch(
        updatePhone({
          id: state.id,
          data: updatedData,
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
        navigate("/phone");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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

export default PhoneDetailsEdit;
