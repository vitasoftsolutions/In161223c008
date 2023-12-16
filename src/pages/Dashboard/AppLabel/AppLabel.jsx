import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLoanBeneficiary, fetchLoanBeneList } from '../../../redux/Actions/AppLabelAction';
import Swal from 'sweetalert2';
import TableHeader from '../../../Components/shared/TableHeader/TableHeader';
import GlobalTable from '../../../Components/shared/Tables/GlobalTable';
const t_head = [
    { name: "Name" },
    { name: "Date" },
    { name: "Status" },
    
    { name: "Actions" },
];
const AppLabel = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.applabelReducer);
    // allDataList
    const allDataList = state.data;
    const newData = state?.data?.map((item) => ({
        id: item.id,
        first_name: item.name,
        date: item.created_at,
        status: item.status,
    }));
    const tableData = {
        ...state,
        data: newData,
    };


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

    //
    //
    return (
        <div>
            <TableHeader
                title={"Label"}
                redirectLink={"/app-label/create"}
                url_endpoint={"/export-csv/?model=AppLabels&app_label=globalapp2"}
            />
            <GlobalTable
                t_head={t_head}
                t_data={tableData}
                allDataList={allDataList}
                handlePageChange={handlePageChange}
                current_page={current_page}
                page_number={page_number}
                deleteFunction={deleteFunction}
                editLink={"/app-label/edit"}
                erp_modalCol={12}
                photoSection={false}
            />
        </div>
    );
};

export default AppLabel;