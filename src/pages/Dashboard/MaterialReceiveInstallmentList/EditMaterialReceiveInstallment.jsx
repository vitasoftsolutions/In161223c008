import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchMaterialPurchaseAllList } from "../../../redux/Actions/MaterialPurchaseAction";
import {
  fetchMaterialReceiveInstallment,
  updateMaterialReceiveInstallment,
} from "../../../redux/Actions/MaterialReceiveInstallmentAction";

function EditMaterialReceiveInstallment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector(
    (state) => state.materialReceiveInstallmentReducer
  );
  //
  const materialState = useSelector(
    (state) => state.materialPurchaseReducer.data
  );

  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchMaterialReceiveInstallment(location.state));
  }, [location.state, dispatch]);

  // fetch Material Purchase AllList
  useEffect(() => {
    dispatch(fetchMaterialPurchaseAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Recieve date",
      fieldType: "date",
      fieldPlaceholder: "Recieve date",
      isRequired: true,
      defaultValue: state.recieve_date,
    },
    {
      fieldName: "Quantity",
      fieldType: "number",
      fieldPlaceholder: "Quantity",
      isRequired: true,
      defaultValue: state.quantity,
    },
    {
      fieldName: "Purchase id",
      fieldType: "select",
      fieldPlaceholder: "Purchase id",
      isRequired: false,
      options: materialState?.map(
        (dt, index) => (
          console.log("vl", state.purchase_id, dt),
          {
            is_select: state.purchase_id === dt.id ? "selected" : "",
            index: state.purchase_id === dt.id ? index : null,
            value: dt.id,
            label: `${dt?.purchase_code}`,
          }
        )
      ),
      defaultValue: state.purchase_id
        ? materialState?.findIndex((dt) => dt.id === state.purchase_id)
        : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        recieve_date: data.recieve_date
          ? data.recieve_date
          : state.recieve_date,
        quantity: data.quantity ? data.quantity : state.quantity,
        purchase_id: data.purchase_id ? data.purchase_id : state.purchase_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateMaterialReceiveInstallment({
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
        navigate("/material-receive-installment");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/material-receive-installment"}
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

export default EditMaterialReceiveInstallment;
