import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchRoles,
  fetchRolesPermission,
  updateRoles,
} from "../../../redux/Actions/_RolesAction";

function EditRoles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.rolesReducer);
  const rolePDataState = useSelector((state) => state.rolesReducer.rolePData);
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchRoles(location.state));
  }, [location.state, dispatch]);

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
      defaultValue: state.name,
    },
    {
      fieldName: "Permissions",
      fieldType: "select",
      fieldPlaceholder: "Permissions",
      isRequired: true,
      hasWidth: 3,
      multiSelect: true,
      options: rolePDataState?.map((dt, index) => {
        const isSelected =
          state.permissions && state.permissions?.includes(dt.id);
        console.log(index + 1, "vl", state.permissions, dt.id);
        return {
          is_select: isSelected ? "selected" : "",
          index: isSelected ? index : null,
          value: dt.id,
          label: `${dt?.name}`,
        };
      }),
      defaultValue: state.permissions
        ? rolePDataState?.findIndex((dt) => state.permissions?.includes(dt?.id))
        : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        name: data.name ? data.name : state.name,
        permissions: data.permissions ? data.permissions : state.permissions,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateRoles({
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
        navigate("/roles");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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

export default EditRoles;
