import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchMaterialPurchase,
  fetchMaterialPurchaseAllList,
} from "../../../redux/Actions/MaterialPurchaseAction";
import {
  fetchMaterialPaymentInstallment,
  updateMaterialPaymentInstallment,
} from "../../../redux/Actions/MaterialPaymentInstallmentAction";

function EditMaterialPaymentInstallment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector(
    (state) => state.materialPaymentInstallmentReducer
  );
  //
  const materialState = useSelector(
    (state) => state.materialPurchaseReducer.data
  );
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchMaterialPaymentInstallment(location.state));
  }, [location.state, dispatch]);

  // fetch Material Purchase AllList
  useEffect(() => {
    dispatch(fetchMaterialPurchaseAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
      hasWidth: 3,
      defaultValue: state.amount,
    },
    {
      fieldName: "Payment date",
      fieldType: "date",
      fieldPlaceholder: "Payment date",
      isRequired: true,
      hasWidth: 3,
      defaultValue: state.payment_date,
    },
    {
      fieldName: "Purchase id",
      fieldType: "select",
      fieldPlaceholder: "Purchase id",
      isRequired: false,
      hasWidth: 3,

      options: materialState?.map(
        (dt, index) => (
          console.log("vl", state.purchase_id , dt ),
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

      // options: materialState?.map(dt => ({
      //   value: dt?.id?.toString(),
      //   label: dt?.purchase_code,
      // })),
      // defaultValue: state.purchase_id,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        amount: data.amount ? data.amount : state.amount,
        payment_date: data.payment_date
          ? data.payment_date
          : state.payment_date,
        purchase_id: data.purchase_id ? data.purchase_id : state.purchase_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateMaterialPaymentInstallment({
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
        navigate("/material-payment-installment");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/material-payment-installment"}
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

export default EditMaterialPaymentInstallment;
