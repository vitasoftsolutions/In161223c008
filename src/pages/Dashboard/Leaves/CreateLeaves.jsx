import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createLeaves } from "../../../redux/Actions/LeavesAction";
import { fetchEmployeeAllList } from "../../../redux/Actions/employeeAction";



function CreateLeaves() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.leavesReducer);
  const employeeState = useSelector((state) => state.employeeReducers.data);
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createLeaves(data));
  };

   // Get the user
   const token = sessionStorage.getItem("jwt_token");
   const result = jwtDecode(token);
   const userId = result.user_id;

   useEffect(() => {
    dispatch(fetchEmployeeAllList());
  }, [dispatch]);

  // 
  const formsData = [
  {
    fieldName: "From date",
    fieldType: "date",
    fieldPlaceholder: "From date",
    isRequired: true,
  },
  {
    fieldName: "To date",
    fieldType: "date",
    fieldPlaceholder: "To date",
    isRequired: true,
  },
  
  {
    fieldName: "Leave Type",
    fieldType: "text",
    fieldPlaceholder: "Leave Type",
    isRequired: true,
  },
  {
    fieldName: "Reason",
    fieldType: "text",
    fieldPlaceholder: "Reason",
    isRequired: true,
  },
  {
    fieldName: "Employee id",
    fieldType: "select",
    fieldPlaceholder: "Employee id",
    isRequired: true,
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
      fieldPlaceholder: "Author",
      defaultValue: userId,
      isRequired: true,
      isHidden: true,
    },
  // author
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
        navigate("/leaves");
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

export default CreateLeaves;
