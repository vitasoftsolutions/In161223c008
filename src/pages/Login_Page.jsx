import LoginForm from "../Components/LoginForm";
import Loader from "../Components/shared/Loader/Loader";

const Login_Page = () => {
  return (
    <div className="min-h-[100vh] bg-erp_bg_main absolute z-50 w-full left-0 top-0">
      <div className="flex flex-col justify-center items-center h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login_Page;
