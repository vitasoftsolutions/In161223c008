import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLoanBeneficiary, fetchType } from '../../../redux/Actions/TypesModuleAction';
import Swal from 'sweetalert2';
import TableHeader from '../../../Components/shared/TableHeader/TableHeader';
import GlobalTable from '../../../Components/shared/Tables/GlobalTable';
const t_head = [
    { name: "Name" },
    { name: "Date" },
    { name: "Status" },
    { name: "Actions" },
];

const TypesLists = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.TypesModuleSliceReducers);
    console.log(state, "satyfay")
    // allDataList
    const allDataList = state?.data;
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
        dispatch(fetchType(current_page));
    }, [dispatch, current_page, state.isDelete, state.isUpdate]);

    const handlePageChange = (newPage) => {
        dispatch(fetchType(newPage));
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
                title={"Types"}
                redirectLink={"/types/create"}
                url_endpoint={"/export-csv/?model=LoanBeneficaries&app_label=loan"}
            />
            <GlobalTable
                t_head={t_head}
                t_data={tableData}
                allDataList={allDataList}
                handlePageChange={handlePageChange}
                current_page={current_page}
                page_number={page_number}
                deleteFunction={deleteFunction}
                editLink={"/types/edit"}
                erp_modalCol={12}
                photoSection={false}
            />
        </div>
    );
};

export default TypesLists;