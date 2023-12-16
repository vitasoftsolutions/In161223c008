import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { ToastContainer, toast } from "react-toastify";
import {
    fetchLoanBene,
    updateLoanBeneficiary,
} from "../../../redux/Actions/AppLabelAction";
import MainForm from "../../../Components/shared/Forms/MainForm";
const EditAppLabel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxState = useSelector((state) => state.applabelReducer);
    const location = useLocation();
    const state = reduxState.sData;

    console.log("sate:",location.state)

    useEffect(() => {
        dispatch(fetchLoanBene(location.state));
    }, [location.state, dispatch]);
    const formsData = [
        {
            fieldName: "Name",
            fieldType: "text",
            fieldPlaceholder: "Name",
            isRequired: true,
      defaultValue: state.name,
            hasWidth: 3
        }];
    const submitFunction = (data) => {
        if (state) {
            console.log(data, "From update page");
            const updatedData = {
                id: state.id,
                status: data.status ? data.status : state.status,
                name: data.name ? data.name : state.name,
                
            };
            dispatch(
                updateLoanBeneficiary({
                    id: state.id,
                    data: updatedData,
                })
            );
        }
    };
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
                navigate("/app-label");
            }, 3000);
        }
    }, [reduxState.isUpdate, navigate]);


    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <Breadcrumb />
                <div className="flex space-x-4">
                    <Link
                        to={"/app-label"}
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
};

export default EditAppLabel;