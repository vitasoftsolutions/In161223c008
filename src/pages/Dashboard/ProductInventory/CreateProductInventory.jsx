import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createProductInventory } from "../../../redux/Actions/ProductInventoryAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchMaterialsListAllData } from "../../../redux/Actions/MaterialsAction";

function CreateProductInventory() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.productInventoryReducer);
  //
  const projectsState = useSelector((state) => state.projectsReducer.data);
  const materialState = useSelector((state) => state.materialsReducer.data);

  console.log(materialState, "materialState")

  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createProductInventory(data));
  };

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
    },
    {
      fieldName: "SR Number",
      fieldType: "text",
      fieldPlaceholder: "SR Number",
      isRequired: false,
    },
    {
      fieldName: "Purchase code",
      fieldType: "text",
      fieldPlaceholder: "Purchase code",
      isRequired: false,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
    },
    {
      fieldName: "Amount Due",
      fieldType: "number",
      fieldPlaceholder: "Amount Due",
      isRequired: false,
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
      fieldName: "Due Quantity",
      fieldType: "number",
      fieldPlaceholder: "Due Quantity",
      isRequired: false,
    },
    {
      fieldName: "Use Quantity",
      fieldType: "number",
      fieldPlaceholder: "Use Quantity",
      isRequired: false,
    },
    {
      fieldName: "Purchase for",
      fieldType: "select",
      fieldPlaceholder: "Purchase for",
      isRequired: false,
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
    },
    {
      fieldName: "Materials",
      fieldType: "select",
      fieldPlaceholder: "Materials",
      isRequired: false,
      multiSelect: true,
      // TODO: Materials not Done
      options: materialState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
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
        navigate("/product-inventory");
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

export default CreateProductInventory;
