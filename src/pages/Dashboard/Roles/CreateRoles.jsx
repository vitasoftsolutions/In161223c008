import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createRoles, fetchRolesPermission } from "../../../redux/Actions/_RolesAction";

function CreateRoles() {
  const dispatch = useDispatch();
  const rentState = useSelector((state) => state.rolesReducer);

  const rolePDataState = useSelector((state) => state.rolesReducer.rolePData);

  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createRoles(data));
  };

  useEffect(() => {
    dispatch(fetchRolesPermission());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "name",
      fieldType: "text",
      fieldPlaceholder: "Type Name Here",
      isRequired: true,
      hasWidth: 3,
    },
    {
      fieldName: "Permissions",
      fieldType: "select",
      fieldPlaceholder: "Permissions",
      isRequired: true,
      hasWidth: 3,
      multiSelect: true,
      options: rolePDataState?.map(
        (dt) => (
          console.log(dt),
          {
            value: dt.id,
            label: `${dt.name}`,
          }
        )
      ),
    },
  ];

  useEffect(() => {
    if (rentState.isCreated) {
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
        navigate("/roles");
      }, 3000);
    }

    if (rentState.isError) {
      toast.error(rentState.data[0], {
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
  }, [rentState.isError, rentState.data, rentState.isCreated, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/roles"}
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

export default CreateRoles;
