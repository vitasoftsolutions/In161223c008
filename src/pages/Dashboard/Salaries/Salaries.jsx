import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteSalaries,
  fetchSalaries,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/salaryAction";

const t_head = [
  { name: "Employee Name" },
  { name: "Salary" },
  { name: "Join Date" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Salary",
    fieldType: "number",
    fieldPlaceholder: "Salary",
  },
];

const Salary = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.salaryReducer);
  // allDataList

  console.log(state, "state");

  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    employee_id: item.employee_id,
    salary: item.salary,
    date: item.date,
    status: item.status,
  }));
  // console.log(state, "state")
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
    dispatch(fetchSalaries(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchSalaries(newPage));
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
        dispatch(deleteSalaries(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  //
  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "hrm/Salaries/";
    const serializer_class = "Salaries";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchSalaries(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };

  //
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Salaries"}
        redirectLink={"/salary/crete-salaries"}
        // For Export & Import
        model_name={"salaries"}
        app_label={"hrm"}
        url_endpoint={"/export-csv/?model=salaries&app_label=hrm"}
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
        editLink={"/salary/edit-salary"}
        erp_modalCol={6}
        photoSection={true}
        nidSection={true}
      />
    </div>
  );
};

export default Salary;
