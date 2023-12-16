import { useDispatch, useSelector } from "react-redux";
import { fetchLoanBeneList } from "../redux/slices/loanBenListSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  if (state.loanBeneList.isLoading) {
    return <p>Loading...</p>;
  }

  console.log("state", state);
  
  return (
    <div>
      <button className="btn" onClick={() => dispatch(fetchLoanBeneList())}>
        Fetch Data
      </button>
    </div>
  );
};

export default MainPage;
