import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { fetchBrand, updateBrands } from "../../../redux/Actions/BrandsAction";
import MainForm from "../../../Components/shared/Forms/MainForm";

function EditBrands() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.brandsReducer);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state)

  useEffect(() => {
    dispatch(fetchBrand(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Name",
      fieldType: "text",
      fieldPlaceholder: "First Name",
      defaultValue: state.name,
      hasWidth:3
    },
    {
      fieldName: "Location",
      fieldType: "text",
      fieldPlaceholder: "Location",
      defaultValue: state.location,
      hasWidth:3
    },
    {
      fieldName: "Logo",
      fieldType: "file",
      fieldPlaceholder: "Upload Image",
      defaultValue: state.logo,
    },
  ];

  const submitFunction = (data) => {
    const logo = data.logo ? data.logo : "";

    if (state) {
      const updateData = {
        id: data.id ? data.id : state.id,
        name: data.name ? data.name : state.name,
        location: data.location ? data.location : state.location,
        is_deleted: data.is_deleted ? data.is_deleted : state.is_deleted,
        status: data.status ? data.status : state.status,
      };

      // Dispatch when logo length is greater than 0
      if (logo !== "") {
        dispatch(
          updateBrands({
            id: state.id,
            data: { ...updateData, logo: logo },
          })
        );
      }

      dispatch(
        updateBrands({
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
        navigate("/brands");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/brands"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-erp_shadow md:mx-10 mb-5 rounded-lg md:p-4">
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

export default EditBrands;
