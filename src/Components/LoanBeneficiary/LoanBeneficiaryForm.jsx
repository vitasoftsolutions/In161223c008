// import { useDispatch, useSelector } from "react-redux";
// import { useForm, useFieldArray } from "react-hook-form";
// import { createLoanBeneficiary } from "../../redux/slices/createLoanBeneficiarySlice";
// import Loader from "../shared/Loader/Loader";
// import { toast, ToastContainer } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";
// import { updateLoanBeneficiary } from "../../redux/slices/updateLoanBeneficiarySlice";
// import { useEffect } from "react";

// const formData = [
//   {
//     fieldName: "First Name",
//     fieldType: "text",
//     fieldPlaceholder: "First Name",
//     isRequired: true,
//   },
//   {
//     fieldName: "Last Name",
//     fieldType: "text",
//     fieldPlaceholder: "Last Name",
//     isRequired: true,
//   },
//   {
//     fieldName: "Email",
//     fieldType: "email",
//     fieldPlaceholder: "example@gmail.com",
//     isRequired: true,
//   },
//   {
//     fieldName: "Nid Number",
//     fieldType: "number",
//     fieldPlaceholder: "Nid Number",
//     isRequired: true,
//   },
//   {
//     fieldName: "Present Address",
//     fieldType: "text",
//     fieldPlaceholder: "Present Address (Comma Separated)",
//     isRequired: true,
//   },
//   {
//     fieldName: "Permanent Address",
//     fieldType: "text",
//     fieldPlaceholder: "Permanent Address (Comma Separated)",
//     isRequired: true,
//   },
//   {
//     fieldName: "Profile Picture",
//     fieldType: "file",
//     fieldPlaceholder: "Upload Image",
//     isRequired: false,
//   },
//   {
//     fieldName: "Nid Front",
//     fieldType: "file",
//     fieldPlaceholder: "Upload Image",
//     isRequired: false,
//   },
//   {
//     fieldName: "Nid Back",
//     fieldType: "file",
//     fieldPlaceholder: "Upload Image",
//     isRequired: false,
//   },
// ];

// const LoanBeneficiaryForm = () => {
//   const dispatch = useDispatch();
//   const loanState = useSelector((state) => state.loanBeneficiary);
//   const navigate = useNavigate();

//   const { state } = useLocation();
//   const defaultValues = state ? state : {};

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     reset,
//   } = useForm({
//     defaultValues: defaultValues,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "phone_number",
//   });

//   const onSubmit = (data) => {
//     const profile_picture = data.profile_picture ? data.profile_picture[0] : "";
//     const nid_front = data.nid_front ? data.nid_front[0] : "";
//     const nid_back = data.nid_back ? data.nid_back[0] : "";

//     const submitData = { ...data, profile_picture, nid_front, nid_back };
//     if (state) {
//       const updateData = {
//         author_id: data.author_id ? data.author_id : state.author_id,
//         email: data.email ? data.email : state.email,
//         first_name: data.first_name ? data.first_name : state.first_name,
//         is_deleted: data.is_deleted ? data.is_deleted : state.is_deleted,
//         last_name: data.last_name ? data.last_name : state.last_name,
//         nid_number: data.nid_number ? data.nid_number : state.nid_number,
//         permanent_address: data.permanent_address
//           ? data.permanent_address
//           : state.permanent_address,
//         present_address: data.present_address
//           ? data.present_address
//           : state.present_address,
//         status: data.status ? data.status : state.status,
//       };

//       // Dispatch when profile_picture length is greater than 0
//       if (profile_picture !== "") {
//         console.log("inside 2");
//         dispatch(
//           updateLoanBeneficiary({
//             id: state.id,
//             data: { ...updateData, profile_picture: profile_picture },
//           })
//         );
//         navigate("/beneficiarylist");
//       }
//       // Dispatch when nid_front length is greater than 0
//       if (nid_front !== "") {
//         console.log("inside 3");
//         dispatch(
//           updateLoanBeneficiary({
//             id: state.id,
//             data: { ...updateData, nid_front: nid_front },
//           })
//         );
//         navigate("/beneficiarylist");
//       }
//       // Dispatch when nid_back length is greater than 0
//       if (nid_back !== "") {
//         console.log("inside 4");
//         dispatch(
//           updateLoanBeneficiary({
//             id: state.id,
//             data: { ...updateData, nid_back: nid_back },
//           })
//         );
//         navigate("/beneficiarylist");
//       }

//       dispatch(
//         updateLoanBeneficiary({
//           id: state.id,
//           data: updateData,
//         })
//       );
//       navigate("/beneficiarylist");
//     } else {
//       dispatch(createLoanBeneficiary(submitData));
//     }
//     reset();
//   };

//   const isLoading = loanState.isLoading;

//   // In a useEffect or similar, check the updated state
//   useEffect(() => {
//     if (loanState.isCreated) {
//       // Perform actions after the update is successful
//       toast("Successfully done", {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       setTimeout(() => {
//         navigate("/owner");
//       }, 3000);
//     }
//   }, [loanState.isCreated, navigate]);

//   useEffect(() => {
//     // Error
//     if (loanState.isError === true) {
//       toast.error(loanState.data[0], {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   }, [loanState]);

//   console.log(loanState)

//   // if (loanState.data?.message.length > 0) {
//   //   toast(loanState.data?.message, {
//   //     position: "top-center",
//   //     autoClose: 5000,
//   //     hideProgressBar: false,
//   //     closeOnClick: true,
//   //     pauseOnHover: true,
//   //     draggable: true,
//   //     progress: undefined,
//   //     theme: "light",
//   //   });
//   // }

//   // if (loanState.isError) {
//   //   toast.error(loanState.isError, {
//   //     position: "top-center",
//   //     autoClose: 5000,
//   //     hideProgressBar: false,
//   //     closeOnClick: true,
//   //     pauseOnHover: true,
//   //     draggable: true,
//   //     progress: undefined,
//   //     theme: "light",
//   //   });
//   // }

//   const renderField = (field) => {
//     if (Array.isArray(field.fieldName)) {
//       return field.fieldName.map((subField, subIndex) => (
//         <div className="mb-4" key={subIndex}>
//           <label
//             htmlFor={subField.toLowerCase().replace(/\s+/g, "_")}
//             className="block text-black mb-1 font-bold"
//           >
//             {subField}
//           </label>
//           <input
//             type={field.fieldType}
//             {...register(subField.toLowerCase().replace(/\s+/g, "_"), {
//               required: subField.isRequired,
//             })}
//             placeholder={field.fieldPlaceholder}
//             className="w-full"
//           />
//           {errors[subField.toLowerCase().replace(/\s+/g, "_")] || (
//             <span className="text-red-500">This field is required</span>
//           )}
//         </div>
//       ));
//     } else {
//       return (
//         <div className="mb-4">
//           <label
//             htmlFor={field.fieldName.toLowerCase().replace(/\s+/g, "_")}
//             className="block text-black mb-1 font-bold"
//           >
//             {field.fieldName}
//           </label>
//           {field.fieldType === "number" ? (
//             <input
//               type="text"
//               {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
//                 required: field.isRequired,
//               })}
//               placeholder={field.fieldPlaceholder}
//               className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
//               onInput={(e) => {
//                 e.target.value = e.target.value.replace(/[^0-9]/g, "");
//               }}
//             />
//           ) : (
//             <input
//               type={field.fieldType}
//               {...register(field.fieldName.toLowerCase().replace(/\s+/g, "_"), {
//                 required: !state && field.isRequired,
//               })}
//               placeholder={field.fieldPlaceholder}
//               className={`${
//                 field.fieldType === "file"
//                   ? "w-full file-input rounded-sm file-input-bordered file-input-primary file-input-sm"
//                   : "w-full border-red-600 rounded-sm py-2 px-3 focus:outline-none"
//               }`}
//               defaultValue={defaultValues[field.fieldName.toLowerCase()]}
//             />
//           )}
//           {errors[field.fieldName.toLowerCase().replace(/\s+/g, "_")] && (
//             <span className="text-red-500">This field is required</span>
//           )}
//         </div>
//       );
//     }
//   };

//   // Add default phone number input set
//   if (fields.length === 0) {
//     append({ phone_number: "", name: "", relation: "" });
//   }

//   return isLoading ? (
//     <Loader text={"Creating please wait..."} />
//   ) : (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
//       >
//         {formData.map((field, index) => (
//           <div className={"col-span-3 md:col-span-1"} key={index}>
//             {renderField(field)}
//           </div>
//         ))}

//         {/* Status */}
//         {state && (
//           <div className="col-span-3 md:col-span-1 mb-4">
//             <label
//               htmlFor="statusInput"
//               className="block text-black mb-1 font-bold"
//             >
//               Status
//             </label>
//             <select
//               id="statusInput"
//               name="status"
//               {...register("status")}
//               defaultValue={state?.status ? "true" : "false"}
//               className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
//             >
//               <option value="true">Active</option>
//               <option value="false">Inactive</option>
//             </select>
//           </div>
//         )}

//         <h5 className="text-black col-span-3 font-extrabold text-start">
//           Add Phone Numbers
//         </h5>

//         {/* Mobile Numbers */}
//         <div className="mb-4 col-span-3">
//           {errors.phone_number && (
//             <span className="text-red-500">
//               At least one phone number is required
//             </span>
//           )}
//           <div className="">
//             {fields.map((field, index) => (
//               <div key={field.id} className="w-full grid grid-cols-3 gap-2">
//                 <div className="col-span-3 md:col-span-1">
//                   <label
//                     htmlFor={`phone_number[${index}].phone_number`}
//                     className="block text-black mb-1 font-bold"
//                   >
//                     Number
//                   </label>
//                   <input
//                     {...register(`phone_number[${index}].phone_number`, {
//                       required: false,
//                     })}
//                     placeholder="Phone Number"
//                     className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
//                   />
//                   <div className="mb-4 col-span-3">
//                     {errors.phone_number && (
//                       <span className="text-red-500">Add a mobile number</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="col-span-3 md:col-span-1">
//                   <label
//                     htmlFor={`phone_number[${index}].name`}
//                     className="block text-black mb-1 font-bold"
//                   >
//                     Name
//                   </label>
//                   <input
//                     {...register(`phone_number[${index}].name`, {
//                       required: false,
//                     })}
//                     placeholder="Name"
//                     className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
//                   />
//                   <div className="mb-4 col-span-3">
//                     {errors.phone_number && (
//                       <span className="text-red-500">Add Name</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="col-span-3 md:col-span-1">
//                   <label
//                     htmlFor={`phone_number[${index}].relation`}
//                     className="block text-black mb-1 font-bold"
//                   >
//                     Relation
//                   </label>
//                   <div className="md:flex border-b-2 border-gray-400 pb-5 md:pb-0 md:border-none items-center">
//                     <input
//                       {...register(`phone_number[${index}].relation`, {
//                         required: false,
//                       })}
//                       placeholder="Relation"
//                       className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
//                     />
//                     {index > 0 && (
//                       <div className="md:ml-3 text-center md:mt-0 mt-3">
//                         <button
//                           className=" bg-red-500 text-white p-2 rounded-md"
//                           type="button"
//                           onClick={() => remove(index)}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             stroke-width="2"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             className="feather feather-x"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                           </svg>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <div className="mb-4 col-span-3">
//                     {errors.phone_number && (
//                       <span className="text-red-500">Add Relation</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="button"
//               onClick={() =>
//                 append({ phone_number: "", name: "", relation: "" })
//               }
//               className="mt-2 btn mx-auto"
//             >
//               Add Number +
//             </button>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mb-4 col-span-3">
//           <input
//             type="submit"
//             value="Submit"
//             className="btn bg-erp_primary text-md text-white hover:bg-primary w-full"
//           />
//         </div>
//       </form>

//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// };

// export default LoanBeneficiaryForm;
