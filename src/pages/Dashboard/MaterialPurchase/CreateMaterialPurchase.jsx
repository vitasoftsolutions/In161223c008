import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { fetchSupplierBeneficariesAllList } from "../../../redux/Actions/SupplierBenAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createMaterialPurchase } from "../../../redux/Actions/MaterialPurchaseAction";



function CreateMaterialPurchase() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.materialPurchaseReducer);
  // 
  const supplierState = useSelector((state) => state.supplierBenSliceReducers.data);
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createMaterialPurchase(data));
  };

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
    },
    {
      fieldName: "SR Number",
      fieldType: "text",
      fieldPlaceholder: "SR Number",
      isRequired: false,
    },
    {
      fieldName: "Purchase Code",
      fieldType: "text",
      fieldPlaceholder: "Purchase Code",
      isRequired: false,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
    },
    {
      fieldName: "Amount Advance",
      fieldType: "number",
      fieldPlaceholder: "Amount Advance",
      isRequired: true,
    },
    {
      fieldName: "Quantity",
      fieldType: "number",
      fieldPlaceholder: "Quantity",
      isRequired: true,
    },
    {
      fieldName: "Recieved Quantity",
      fieldType: "number",
      fieldPlaceholder: "Recieved Quantity",
      isRequired: false,
    },
    {
      fieldName: "Purchase for",
      fieldType: "text",
      fieldPlaceholder: "Purchase for",
      isRequired: false,
    },
    {
      fieldName: "Vendor id",
      fieldType: "select",
      fieldPlaceholder: "Vendor id",
      isRequired: false,
      options: supplierState.map(user => ({
        value: user.id.toString(),
        label: `${user.first_name} ${user.last_name}`,
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
        navigate("/material-purchase");
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
            to={"/material-purchase"}
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

export default CreateMaterialPurchase;
