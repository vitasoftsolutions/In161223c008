
import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchAppLabelAllList } from "../../../redux/Actions/AppLabelAction";
import { fetchSType, updateTypes } from "../../../redux/Actions/TypesModuleAction";

function TypesEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxState = useSelector((state) => state.TypesModuleSliceReducers);
    const applabeState = useSelector((state) => state.applabelReducer.data);

    const location = useLocation();
    const state = reduxState.sData;


    useEffect(() => {
        dispatch(fetchSType(location.state));
    }, [location.state, dispatch]);

    // fetchAppLabelAllList
    useEffect(() => {
        dispatch(fetchAppLabelAllList());
    }, [dispatch]);

    console.log(state, "Employee id")

    const formsData = [
        {
            fieldName: "Name",
            fieldType: "text",
            fieldPlaceholder: "Name",
            hasWidth: 3,
            defaultValue: state.name,
        },
        {
            fieldName: "Employee id",
            fieldType: "select",
            fieldPlaceholder: "Employee id",
            defaultValue: state.employee_id,
            hasWidth: 3,
            options: applabeState?.map((dt) => ({
                value: dt?.id,
                label: dt?.name,
            })),
        },
    ];

    const submitFunction = (data) => {

        if (state) {
            const updateData = {
                name: data.name ? data.name : state.name,
                employee_id: data.employee_id ? data.employee_id : state.employee_id,
                status: data.status ? data.status : state.status,
            };

            dispatch(
                updateTypes({
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
                navigate("/types");
            }, 3000);
        }
    }, [reduxState.isUpdate, navigate]);

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <Breadcrumb />
                <div className="flex space-x-4">
                    <Link
                        to={"/types"}
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

export default TypesEdit;
