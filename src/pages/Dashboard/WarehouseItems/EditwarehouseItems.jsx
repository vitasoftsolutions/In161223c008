import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import { fetchWarehouseItems, updateWarehouseItems } from "../../../redux/Actions/_WarehouseItemsAction";
import MainForm from "../../../Components/shared/Forms/MainForm";

function EditWarehouseItems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.warehouseItemsReducer);
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchWarehouseItems(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Quantity",
      fieldType: "number",
      fieldPlaceholder: "Quantity",
      isRequired: true,
      defaultValue: state.quantity,
    },
    {
      fieldName: "Due Quantity",
      fieldType: "number",
      fieldPlaceholder: "Due Quantity",
      isRequired: true,
      defaultValue: state.due_quantity,
    },
    {
      fieldName: "Purchase id",
      fieldType: "text",
      fieldPlaceholder: "Purchase id",
      isRequired: true,
      defaultValue: state.purchase_id,
    },
    {
      fieldName: "Inventory id",
      fieldType: "text",
      fieldPlaceholder: "Inventory id",
      isRequired: true,
      defaultValue: state.inventory_id,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        author_id: data.author_id ? data.author_id : state.author_id,
        quantity: data.quantity ? data.quantity : state.quantity,
        due_quantity: data.due_quantity
          ? data.due_quantity
          : state.due_quantity,
        purchase_id: data.purchase_id ? data.purchase_id : state.purchase_id,
        inventory_id: data.inventory_id
          ? data.inventory_id
          : state.inventory_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateWarehouseItems({
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
        navigate("/warehouse-items");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/warehouse-items"}
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

export default EditWarehouseItems;
