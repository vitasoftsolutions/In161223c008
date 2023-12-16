import no_data from "../../../public/no_data.svg";

function NoData() {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <img src={no_data} alt="" width={100} className="opacity-50 mb-3" />
      <p className="my-2 font-bold text-gray-500">No data available</p>
    </div>
  );
}

export default NoData;
