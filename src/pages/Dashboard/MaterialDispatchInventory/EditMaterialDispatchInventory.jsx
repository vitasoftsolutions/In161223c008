import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import {
  fetchMaterialDispatchInventory,
  updateMaterialDispatchInventory,
} from "../../../redux/Actions/MaterialDispatchInventoryAction";
import { fetchMaterialsListAllData } from "../../../redux/Actions/MaterialsAction";
import { fetchProductInventoryAllList } from "../../../redux/Actions/ProductInventoryAction";

function EditMaterialDispatchInventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector(
    (state) => state.materialDispatchInventoryReducer
  );
  //
  const projectsState = useSelector((state) => state.projectsReducer.con_data);
  const productInv = useSelector((state) => state.productInventoryReducer.data);
  const materialState = useSelector((state) => state.materialsReducer.data);

  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchMaterialDispatchInventory(location.state));
  }, [location.state, dispatch]);

  // fetch Material Purchase AllList
  useEffect(() => {
    dispatch(fetchMaterialsListAllData());
    dispatch(fetchProjectsAllList());
    dispatch(fetchProductInventoryAllList());
  }, [dispatch]);

  const optionsArray = [
    { value: "Check in", label: "Check in" },
    { value: "Check out", label: "Check out" },
    { value: "Return", label: "Return" },
    { value: "Swap", label: "Swap" },
  ];

  const formsData = [
    {
      fieldName: "Quantity",
      fieldType: "number",
      fieldPlaceholder: "Quantity",
      isRequired: true,
      defaultValue: state.quantity,
    },
    {
      fieldName: "Check status",
      fieldType: "select",
      fieldPlaceholder: "Check status",
      isRequired: false,
      options: optionsArray,
      defaultValue: state.check_status
        ? optionsArray.findIndex(
            (option) => option.value === state.check_status
          )
        : null,
    },
    {
      fieldName: "Inventory item id",
      fieldType: "select",
      fieldPlaceholder: "Inventory item id",
      isRequired: false,

      options: productInv?.map(
        (dt, index) => (
          console.log("vl", state.inventory_item_id, dt),
          {
            is_select: state.inventory_item_id === dt.id ? "selected" : "",
            index: state.inventory_item_id === dt.id ? index : null,
            value: dt.id,
            label: `${dt?.id}`,
          }
        )
      ),
      defaultValue: state.inventory_item_id
        ? productInv?.findIndex((dt) => dt.id === state.inventory_item_id)
        : null,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: false,

      options: projectsState?.map(
        (dt, index) => (
          console.log("vl", state.project_id, dt),
          {
            is_select: state.project_id === dt.id ? "selected" : "",
            index: state.project_id === dt.id ? index : null,
            value: dt.id.toString(),
            label: dt.name,
          }
        )
      ),
      defaultValue: state.project_id
        ? projectsState?.findIndex((dt) => dt.id === state.project_id)
        : null,
    },
    {
      fieldName: "Metarial",
      fieldType: "select",
      fieldPlaceholder: "Metarial",
      isRequired: true,
      multiSelect: true,

      options: materialState?.map((dt, index) => {
        const isSelected = state.brand && state.brand?.includes(dt.id);
        console.log(state, 'state');
        return {
          is_select: isSelected ? "selected" : "",
          index: isSelected ? index : null,
          value: dt.id.toString(),
            label: dt.name,
        };
      }),
      defaultValue: state.metarial
        ? materialState?.findIndex((dt) => state.brand?.includes(dt?.id))
        : null,

      // defaultValue: state.metarial,
      // options: materialState?.map((dt) => ({
      //   value: dt.id.toString(),
      //   label: dt.name,
      // })),
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        quantity: data.quantity ? data.quantity : state.quantity,
        check_status: data.check_status
          ? data.check_status
          : state.check_status,
        inventory_item_id: data.inventory_item_id
          ? data.inventory_item_id
          : state.inventory_item_id,
        project_id: data.project_id ? data.project_id : state.project_id,
        metarial: data.metarial ? data.metarial : state.metarial,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateMaterialDispatchInventory({
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
        navigate("/material-dispatch-inventory");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/material-dispatch-inventory"}
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

export default EditMaterialDispatchInventory;
