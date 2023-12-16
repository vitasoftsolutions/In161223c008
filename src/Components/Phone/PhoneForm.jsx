import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../shared/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import { createPhone, updatePhone } from "../../redux/Actions/PhoneAction";
import { useLocation, useNavigate } from "react-router-dom";

const PhoneForm = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.phoneReducers);

  let { state } = useLocation();

  console.log(state);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (state) {
      const updatedData = {
        id: state.id,
        ...data,
      };
      dispatch(updatePhone(updatedData));
      navigate("/phone");
    } else {
      dispatch(createPhone(data));
      reset();
    }
  };

  const isLoading = reduxState.isLoading;

  if (reduxState.massage?.id) {
    toast("Successfully done", {
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

  if (reduxState.isError) {
    toast.error("Failed to do", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return isLoading ? (
    <Loader text={"Creating please wait..."} />
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="w-full mx-auto p-4 grid grid-cols-3 gap-x-4 rounded-md bg-opacity-50 backdrop-blur-md bg-gray-200"
      >
        {/* Name */}
        <div className={"col-span-3 md:col-span-1"}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black mb-1 font-bold">
              Name
            </label>
            <input
              defaultValue={state ? state?.name : ""}
              type="text"
              {...register("name", { required: true })}
              placeholder="Name here"
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        {/* Phone number */}
        <div className={"col-span-3 md:col-span-1"}>
          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="block text-black mb-1 font-bold"
            >
              Phone number
            </label>
            <input
              defaultValue={state ? state?.phone_number : ""}
              type="text"
              {...register("phone_number", { required: true })}
              placeholder="Phone Number"
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
            />
            {errors.phone_number && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        {/* Relation */}
        <div className={"col-span-3 md:col-span-1"}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black mb-1 font-bold">
              Relation
            </label>
            <input
              defaultValue={state ? state?.relation : ""}
              type="text"
              {...register("relation", { required: true })}
              placeholder="Relation here"
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
            />
            {errors.relation && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* Status */}
        {state && (
          <div className="col-span-3 md:col-span-1 mb-4">
            <label
              htmlFor="statusInput"
              className="block text-black mb-1 font-bold"
            >
              Status
            </label>
            <select
              id="statusInput"
              name="status"
              {...register("status")}
              defaultValue={state?.status ? "true" : "false"}
              className="w-full border-red-600 rounded-md py-2 px-3 focus:outline-none"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <div className="mb-4 col-span-3">
          <input
            type="submit"
            value="Submit"
            className="btn bg-erp_primary text-md text-white hover:bg-primary w-full"
          />
        </div>
      </form>

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

export default PhoneForm;
