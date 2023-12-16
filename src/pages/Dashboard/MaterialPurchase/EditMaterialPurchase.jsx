import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchSupplierBeneficariesAllList } from "../../../redux/Actions/SupplierBenAction";
import {
  fetchMaterialPurchase,
  updateMaterialPurchase,
} from "../../../redux/Actions/MaterialPurchaseAction";

function EditMaterialPurchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.materialPurchaseReducer);
  const supplierState = useSelector(
    (state) => state.supplierBenSliceReducers.data
  );
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchMaterialPurchase(location.state));
  }, [location.state, dispatch]);

  // fetch Supplier Beneficaries AllList
  useEffect(() => {
    dispatch(fetchSupplierBeneficariesAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "SR Name",
      fieldType: "text",
      fieldPlaceholder: "SR Name",
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
      fieldName: "Purchase Code",
      fieldType: "text",
      fieldPlaceholder: "Purchase Code",
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
      fieldName: "Purchase for",
      fieldType: "text",
      fieldPlaceholder: "Purchase for",
      isRequired: false,
      defaultValue: state.purchase_for,
    },
    {
      fieldName: "Vendor id",
      fieldType: "select",
      fieldPlaceholder: "Vendor id",
      isRequired: false,

      options: supplierState?.map(
        (dt, index) => (
          console.log("vl", state , dt ),
          {
            is_select: state.vendor_id === dt.id ? "selected" : "",
            index: state.vendor_id === dt.id ? index : null,
            value: dt.id.toString(),
            label: `${dt.first_name} ${dt.last_name}`,
          }
        )
      ),
      defaultValue: state.vendor_id
        ? supplierState?.findIndex((dt) => dt.id === state.vendor_id)
        : null,

      // options: supplierState.map((user) => ({
      //   value: user.id.toString(),
      //   label: `${user.first_name} ${user.last_name}`,
      // })),
      // defaultValue: state.vendor_id,
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
        purchase_for: data.purchase_for
          ? data.purchase_for
          : state.purchase_for,
        vendor_id: data.vendor_id ? data.vendor_id : state.vendor_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateMaterialPurchase({
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
        navigate("/material-purchase");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/material-purchase"}
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

export default EditMaterialPurchase;
