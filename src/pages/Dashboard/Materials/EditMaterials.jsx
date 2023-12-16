import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MaterialsForm from "./MaterialsForm";
import { fetchBrandsAllData } from "../../../redux/Actions/BrandsAction";
import {
  fetchMaterial,
  updateMaterials,
} from "../../../redux/Actions/MaterialsAction";

function EditMaterials() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.materialsReducer);
  //
  const brandsState = useSelector((state) => state.brandsReducer.data);

  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchMaterial(location.state));
  }, [location.state, dispatch]);

  // fetch Material Purchase AllList
  useEffect(() => {
    dispatch(fetchBrandsAllData());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Name",
      fieldType: "text",
      fieldPlaceholder: "Name",
      isRequired: false,
      defaultValue: state.name,
    },
    {
      fieldName: "Description",
      fieldType: "text",
      fieldPlaceholder: "Description",
      isRequired: false,
      defaultValue: state.description,
    },
    {
      fieldName: "Dimenssion",
      fieldType: "number",
      fieldPlaceholder: "Dimenssion",
      isRequired: true,
      defaultValue: state.dimenssion,
    },
    {
      fieldName: "Brand",
      fieldType: "select",
      fieldPlaceholder: "Brand",
      isRequired: false,
      multiSelect: true,
      // brandsState
      options: brandsState?.map((dt, index) => {
        const isSelected = state.brand && state.brand?.includes(dt.id);
        console.log(index + 1, "vl", state.brand?.includes(dt?.id));
        console.log('fgfg', isSelected ? index : null)
        return {
          is_select: isSelected ? "selected" : "",
          index: isSelected ? index : null,
          value: dt.id,
          label: `${dt?.name}`,
        };
      }),
      defaultValue: state.brand
        ? brandsState?.findIndex((dt) => state.brand?.includes(dt?.id))
        : null,
      // defaultValue: state.brand,
      // options: brandsState?.map((dt) => ({
      //   value: dt.id.toString(),
      //   label: dt.name,
      // })),
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        name: data.name ? data.name : state.name,
        description: data.description ? data.description : state.description,
        dimenssion: data.dimenssion ? data.dimenssion : state.dimenssion,
        features: data.features ? data.features : state.features,
        brand: data.brand ? data.brand : state.brand,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateMaterials({
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
        navigate("/materials");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/materials"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MaterialsForm
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

export default EditMaterials;
