import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
    deleteLoanBeneficiary,
    fetchLoanBeneList,
    searchLoanBeneficiaries,
} from "../../../redux/Actions/SupplierBenAction";
const t_head = [
    { name: "Name" },
    { name: "Image" },
    { name: "Join Date" },
    { name: "E-mail" },
    { name: "Status" },
    { name: "Actions" },
];

const formsData = [
    {
      fieldName: "First name",
      fieldType: "text",
      fieldPlaceholder: "First name",
    },
    {
      fieldName: "Last name",
      fieldType: "text",
      fieldPlaceholder: "Last name",
    },
  ];

const SupBenLists = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.ContractorBenReducers);
    // allDataList

    // console.log(state, "statestatestate")

    const allDataList = state.data;
    const newData = state?.data?.map((item) => ({
        id: item.id,
        first_name: item.first_name + " " + item.last_name,
        image: item.profile_picture,
        date: item.created_at,
        email: item.email,
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
        dispatch(fetchLoanBeneList(current_page));
    }, [dispatch, current_page, state.isDelete, state.isUpdate]);

    const handlePageChange = (newPage) => {
        dispatch(fetchLoanBeneList(newPage));
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
                dispatch(deleteLoanBeneficiary(id));
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
    const app_model = "suppliers/SupplierBeneficaries/";
    const serializer_class = "SupliersBeneficaries";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanBeneList(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };
    
    //
    return (
        <div className="max-w-screen">
            <TableHeader
                title={"Beneficiary"}
                redirectLink={"/suppliers-beneficaries/create"}
                model_name={"supplierBeneficaries"}
                app_label={"suppliers"}
                url_endpoint={"/export-csv/?model=supplierBeneficaries&app_label=suppliers"}
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
                editLink={"/suppliers-beneficaries/edit"}
                erp_modalCol={6}
                photoSection={true}
            />
        </div>
    );
    };
    export default SupBenLists;