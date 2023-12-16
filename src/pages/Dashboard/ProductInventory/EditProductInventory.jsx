import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchProductInventory,
  updateProductInventory,
} from "../../../redux/Actions/ProductInventoryAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchMaterialsListAllData } from "../../../redux/Actions/MaterialsAction";

function EditProductInventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.productInventoryReducer);
  //
  const projectsState = useSelector((state) => state.projectsReducer.data);
  const materialState = useSelector((state) => state.materialsReducer.data);
  //
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchProductInventory(location.state));
  }, [location.state, dispatch]);

  // fetch Material Purchase AllList
  useEffect(() => {
    dispatch(fetchProjectsAllList());
    dispatch(fetchMaterialsListAllData());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "SR name",
      fieldType: "text",
      fieldPlaceholder: "SR name",
      isRequired: false,
      defaultValue: state.sr_name,
    },
    {
      fieldName: "SR Number",
      fieldType: "text",
      fieldPlaceholder: "SR Number",
      isRequired: false,
      defaultValue: state.sr_number,
    },
    {
      fieldName: "Purchase code",
      fieldType: "text",
      fieldPlaceholder: "Purchase code",
      isRequired: false,
      defaultValue: state.purchase_code,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
      defaultValue: state.amount,
    },
    {
      fieldName: "Amount Due",
      fieldType: "number",
      fieldPlaceholder: "Amount Due",
      isRequired: false,
      defaultValue: state.amount_due,
    },
    {
      fieldName: "Amount Advance",
      fieldType: "number",
      fieldPlaceholder: "Amount Advance",
      isRequired: true,
      defaultValue: state.amount_advance,
    },
    {
      fieldName: "Quantity",
      fieldType: "number",
      fieldPlaceholder: "Quantity",
      isRequired: true,
      defaultValue: state.quantity,
    },
    {
      fieldName: "Recieved Quantity",
      fieldType: "number",
      fieldPlaceholder: "Recieved Quantity",
      isRequired: false,
      defaultValue: state.recieved_quantity,
    },
    {
      fieldName: "Due Quantity",
      fieldType: "number",
      fieldPlaceholder: "Due Quantity",
      isRequired: false,
      defaultValue: state.due_quantity,
    },
    {
      fieldName: "Use Quantity",
      fieldType: "number",
      fieldPlaceholder: "Use Quantity",
      isRequired: false,
      defaultValue: state.use_quantity,
    },
    {
      fieldName: "Purchase for",
      fieldType: "select",
      fieldPlaceholder: "Purchase for",
      isRequired: false,
      defaultValue: state.purchase_for,
      options: projectsState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
    {
      fieldName: "Vendor id",
      fieldType: "text",
      fieldPlaceholder: "Vendor id",
      isRequired: false,
      defaultValue: state.vendor_id,
    },
    {
      fieldName: "Materials",
      fieldType: "select",
      fieldPlaceholder: "Materials",
      isRequired: false,
      defaultValue: state.materials,
      multiSelect: true,
      options: materialState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        sr_name: data.sr_name ? data.sr_name : state.sr_name,
        sr_number: data.sr_number ? data.sr_number : state.sr_number,
        purchase_code: data.purchase_code
          ? data.purchase_code
          : state.purchase_code,
        amount: data.amount ? data.amount : state.amount,
        amount_due: data.amount_due ? data.amount_due : state.amount_due,
        amount_advance: data.amount_advance
          ? data.amount_advance
          : state.amount_advance,
        quantity: data.quantity ? data.quantity : state.quantity,
        recieved_quantity: data.recieved_quantity
          ? data.recieved_quantity
          : state.recieved_quantity,
        due_quantity: data.due_quantity
          ? data.due_quantity
          : state.due_quantity,
        use_quantity: data.use_quantity
          ? data.use_quantity
          : state.use_quantity,
        purchase_for: data.purchase_for
          ? data.purchase_for
          : state.purchase_for,
        vendor_id: data.vendor_id ? data.vendor_id : state.vendor_id,
        materials: data.materials ? data.materials : state.materials,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateProductInventory({
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
        navigate("/product-inventory");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/product-inventory"}
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

export default EditProductInventory;
