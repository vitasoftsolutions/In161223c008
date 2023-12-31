import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchMaterialPurchaseAllList } from "../../../redux/Actions/MaterialPurchaseAction";
import { createMaterialPaymentInstallment } from "../../../redux/Actions/MaterialPaymentInstallmentAction";



function CreateMaterialPaymentInstallment() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.materialPaymentInstallmentReducer);
  // 
  const materialState = useSelector((state) => state.materialPurchaseReducer.data);
  console.log(materialState, "materialState")
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createMaterialPaymentInstallment(data));
  };

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
      hasWidth:3,
    },
    {
      fieldName: "Payment date",
      fieldType: "date",
      fieldPlaceholder: "Payment date",
      isRequired: true,
      hasWidth:3,
    },
    {
      fieldName: "Purchase id",
      fieldType: "select",
      fieldPlaceholder: "Purchase id",
      isRequired: false,
      hasWidth:3,
      options: materialState?.map(dt => ({
        value: dt?.id?.toString(),
        label: dt?.purchase_code,
      })),
    },
    
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
        navigate("/material-payment-installment");
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

export default CreateMaterialPaymentInstallment;
