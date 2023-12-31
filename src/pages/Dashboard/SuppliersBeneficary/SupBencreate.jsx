import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import BeneficiaryForm from "../../../Components/shared/Forms/BeneficiaryForm";
import { createLoanBen } from "../../../redux/Actions/SupplierBenAction";

const formsData = [
    {
        fieldName: "First Name",
        fieldType: "text",
        fieldPlaceholder: "First Name",
        isRequired: true,
    },
    {
        fieldName: "Last Name",
        fieldType: "text",
        fieldPlaceholder: "Last Name",
        isRequired: true,
    },
    {
        fieldName: "Email",
        fieldType: "email",
        fieldPlaceholder: "example@gmail.com",
        isRequired: true,
    },
    {
        fieldName: "Nid Number",
        fieldType: "number",
        fieldPlaceholder: "Nid Number",
        isRequired: true,
    },
    {
        fieldName: "Present Address",
        fieldType: "text",
        fieldPlaceholder: "Present Address (Comma Separated)",
        isRequired: true,
    },
    {
        fieldName: "Permanent Address",
        fieldType: "text",
        fieldPlaceholder: "Permanent Address (Comma Separated)",
        isRequired: true,
    },
    {
        fieldName: "Profile Picture",
        fieldType: "file",
        fieldPlaceholder: "Upload Image",
        isRequired: false,
    },
    {
        fieldName: "Nid Front",
        fieldType: "file",
        fieldPlaceholder: "Upload Image",
        isRequired: false,
    },
    {
        fieldName: "Nid Back",
        fieldType: "file",
        fieldPlaceholder: "Upload Image",
        isRequired: false,
    },
];

const SupBencreate = () => {
    const dispatch = useDispatch();
    const loanState = useSelector((state) => state.loanBeneficiary);
    const navigate = useNavigate();

    const submitFunction = (data) => {
        dispatch(createLoanBen(data));
    };

    useEffect(() => {
        if (loanState.isCreated) {
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
                navigate("/suppliers-beneficaries");
            }, 3000);
        }

        if (loanState.isError) {
            toast.error(loanState.data[0], {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [loanState.isError, loanState.data, loanState.isCreated, navigate]);

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <Breadcrumb />
                <div className="flex space-x-4">
                    <Link
                        to={"/suppliers-beneficaries"}
                        className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
                    >
                        <BsArrowLeftShort /> Back
                    </Link>
                </div>
            </div>
            <div className="bg-white shadow-lg shadow-erp_shadow md:mx-10 mb-5 rounded-lg md:p-4">
                <BeneficiaryForm
                    formsData={formsData}
                    submitFunction={submitFunction}
                    isReset={true}
                />
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2000}
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

export default SupBencreate;