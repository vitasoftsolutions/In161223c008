import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchMaterialsListAllData } from "../../../redux/Actions/MaterialsAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchProductInventoryAllList } from "../../../redux/Actions/ProductInventoryAction";
import { createMaterialDispatchInventory } from "../../../redux/Actions/MaterialDispatchInventoryAction";

function CreateMaterialDispatchInventory() {
  const dispatch = useDispatch();
  const loanState = useSelector((state) => state.materialDispatchInventoryReducer);
  //
  const projectsState = useSelector((state) => state.projectsReducer.con_data);
  const productInv = useSelector((state) => state.productInventoryReducer.data);
  const materialState = useSelector((state) => state.materialsReducer.data);

console.log(projectsState, "projectsState")

  // Navigation
  const navigate = useNavigate();

  const submitFunction = (data) => {
    dispatch(createMaterialDispatchInventory(data));
  };

  // fetch Material Purchase AllList
  useEffect(() => {
    dispatch(fetchMaterialsListAllData());
    dispatch(fetchProjectsAllList());
    dispatch(fetchProductInventoryAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Quantity",
      fieldType: "number",
      fieldPlaceholder: "Quantity",
      isRequired: true,
    },
    {
      fieldName: "Check status",
      fieldType: "select",
      fieldPlaceholder: "Check status",
      isRequired: false,
      options: [
        { value: "Check in", label: "Check in" },
        { value: "Check out", label: "Check out" },
        { value: "Return", label: "Return" },
        { value: "Swap", label: "Swap" },
      ],
    },
    {
     
      fieldName: "Inventory item id",
      fieldType: "select",
      fieldPlaceholder: "Inventory item id",
      isRequired: false,
      options: productInv?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.id,
      })),
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: false,
      options: projectsState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
    {
      fieldName: "Metarial",
      fieldType: "select",
      fieldPlaceholder: "Metarial",
      isRequired: true,
      multiSelect: true,
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
        navigate("/material-dispatch-inventory");
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
            to={"/material-dispatch-inventory"}
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

export default CreateMaterialDispatchInventory;
