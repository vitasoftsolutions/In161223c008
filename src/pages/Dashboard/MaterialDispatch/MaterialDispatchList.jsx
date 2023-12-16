import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteMaterialDispatch,
  fetchMaterialDispatchList,
  searchMaterialDispatch,
} from "../../../redux/Actions/MaterialDispatchAction";

const t_head = [
  { name: "Warehouse Item" },
  { name: "Project Name" },
  { name: "Quantity" },
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
  
];

const MaterialDispatchList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.materialDispatchReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    warehouse_item_id: item.warehouse_item_id,
    id: item.id,
    project_id: item.project_id,
    quantity: item.quantity,
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
    dispatch(fetchMaterialDispatchList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchMaterialDispatchList(newPage));
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
        dispatch(deleteMaterialDispatch(id));
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
      dispatch(fetchMaterialDispatchList(current_page));
    } else {
      dispatch(searchMaterialDispatch(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Material Dispatch"}
        redirectLink={"/material-dispatch/material-dispatch-crete"}
        model_name={"warehouseMaterialDispatch"}
        app_label={"wearhouse"}
        url_endpoint={
          "/export-csv/?model=warehouseMaterialDispatch&app_label=wearhouse"
        }
        //
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
        editLink={"/material-dispatch/edit-material-dispatch"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default MaterialDispatchList;
