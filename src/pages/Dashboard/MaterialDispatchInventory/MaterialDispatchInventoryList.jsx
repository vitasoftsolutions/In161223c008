import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteMaterialDispatchInventory,
  fetchMaterialDispatchInventoryList,
  searchMaterialDispatchInventory,
} from "../../../redux/Actions/MaterialDispatchInventoryAction";

const t_head = [
  { name: "Inventory Item" },
  { name: "Project Name" },
  { name: "Quantity" },
  { name: "Check Status" },
  { name: "Created Date" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Check status",
    fieldType: "text",
    fieldPlaceholder: "Check status",
  },
  {
    fieldName: "Quantity",
    fieldType: "number",
    fieldPlaceholder: "Quantity",
  },
];

const MaterialDispatchInventoryList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.materialDispatchInventoryReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    inventory_item_id: item.inventory_item_id,
    project_id: item.project_id,
    quantity: item.quantity,
    check_status: item.check_status,
    date: item.created_at,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  //

  // console.log(tableData, "tableData");

  const current_page = state.currentPage;
  const total_page = state.totalPages;

  // Pages
  let page_number = [];
  for (let i = current_page - 1; i <= current_page + 1; i++) {
    if (i < 1) continue;
    if (i > total_page) break;
    page_number.push(i);
  }

  useEffect(() => {
    dispatch(fetchMaterialDispatchInventoryList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchMaterialDispatchInventoryList(newPage));
  };

  // console.log(state, "state_ page");

  const deleteFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMaterialDispatchInventory(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "wearhouse/WarehouseMaterialDispatch/";
    const serializer_class = "WarehouseMaterialDispatch";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchMaterialDispatchInventoryList(current_page));
    } else {
      dispatch(searchMaterialDispatchInventory(searchData));
    }
  };

  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Material Inventory Dispatch"}
        redirectLink={
          "/material-dispatch-inventory/material-dispatch-inventory-crete"
        }
        model_name={"warehouseMaterialDispatch"}
        app_label={"wearhouse"}
        url_endpoint={
          "/export-csv/?model=warehouseMaterialDispatch&app_label=wearhouse"
        }
        // For filters
        onSearch={handleSearch}
        formsData={formsData}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={
          "/material-dispatch-inventory/edit-material-dispatch-inventory"
        }
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default MaterialDispatchInventoryList;
