import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import { deleteLeaves, fetchLeavesList, searchLeaves } from "../../../redux/Actions/LeavesAction";

const t_head = [
  { name: "Apply Date" },
  { name: "From Date" },
  { name: "To Date" },
  { name: "Days" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Reason",
    fieldType: "text",
    fieldPlaceholder: "Reason",
  },
  // {
  //   fieldName: "Amount",
  //   fieldType: "number",
  //   fieldPlaceholder: "Amount",
  // },
];

const LeavesList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.leavesReducer);
  // allDataList
  console.log("first", state)
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    date: item.apply_date,
    from_date: item.from_date,
    to_date: item.to_date,
    days: item.days,
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
    dispatch(fetchLeavesList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLeavesList(newPage));
  };

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
        dispatch(deleteLeaves(id));
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
    const app_model = "hrm/Leaves/";
    const serializer_class = "Leaves";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLeavesList(current_page));
    } else {
      dispatch(searchLeaves(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Leaves"}
        redirectLink={"/leaves/leaves-crete"}
        // For Export & Import
        model_name={"leaves"}
        app_label={"hrm"}
        url_endpoint={"/export-csv/?model=leaves&app_label=hrm"}
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
        editLink={"/leaves/edit-leaves"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default LeavesList;
