import {
  FaChartLine,
  FaLevelUpAlt,
  FaRegBookmark,
  FaUsers,
} from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiArcheryTarget } from "react-icons/gi";
import { IoPieChartSharp } from "react-icons/io5";
import { MdOutlineWifiTethering } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import MyBarChart from "../../Components/shared/AllCharts/Chart_PaymentPerMonth";
import Chart_MostDownloadedIndustry from "../../Components/shared/AllCharts/Chart_MostDownloadedIndustry";

const top_cards = [
  {
    icons: <FaChartLine />,
    content: "Total User",
    number: "123.40",
    footer_icons: <FaRegBookmark />,
    footer_text: "All erp users",
    bg1: "#DB8282",
    bg2: "#DDB249",
  },
  {
    icons: <GiArcheryTarget />,
    content: "Total User",
    number: "123.40",
    footer_icons: <FaRegBookmark />,
    footer_text: "All erp users",
    bg1: "#84AEC2",
    bg2: "#6D53DC",
  },
  {
    icons: <FaMoneyBillTrendUp />,
    content: "Total User",
    number: "123.40",
    footer_icons: <FaRegBookmark />,
    footer_text: "All erp users",
    bg1: "#04616E",
    bg2: "#B7D7C9",
  },
  {
    icons: <IoPieChartSharp />,
    content: "Total User",
    number: "123.40",
    footer_icons: <FaRegBookmark />,
    footer_text: "All erp users",
    bg1: "#DB8282",
    bg2: "#E54D24",
  },
];

const data_card = [
  {
    icons: <FaUsers />,
    text: "Total Users",
    number: "31,004",
    percentage: "4.9%",
  },
  {
    icons: <FaLevelUpAlt />,
    text: "Total Users",
    number: "31,004",
    percentage: "4.9%",
  },
  {
    icons: <MdOutlineWifiTethering />,
    text: "Total Users",
    number: "31,004",
    percentage: "4.9%",
  },
  {
    icons: <CiFaceSmile />,
    text: "Total Users",
    number: "31,004",
    percentage: "4.9%",
  },
];

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-[80vh]">
      <h1 className="text-primary text-4xl my-5 uppercase">
        Welcome to <span className="text-green-600">ERP</span>
      </h1>
      <div className="p-3 w-full">
        <div className="grid md:grid-cols-4 gap-3 mb-10">
          {/* Mapping cards */}
          {top_cards.map((cr, index) => (
            <div
              key={index}
              className={`col-span-1 h-36 rounded-xl`}
              style={{
                background: `linear-gradient(to right, ${cr.bg1}, ${cr.bg2})`,
              }}
            >
              <div className="flex border-b-2">
                <div className="flex justify-center items-center text-white text-3xl bg-gray-300 h-14 w-14 ml-4 mt-4 bg-opacity-60 rounded-md">
                  <div>{cr.icons}</div>
                </div>
                <div className="text-white m-4">
                  <p>{cr.content}</p>
                  <h3 className="text-xl font-bold">{cr.number}</h3>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-center items-center gap-3 mt-4 text-white">
                <div className="flex items-center gap-3">
                  <span>{cr.footer_icons}</span>
                  <span>{cr.footer_text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="md:col-span-1 shadow-xl shadow-blue-200 p-5"
            style={{ height: "380px", width: "100%" }}
          >
            <h2 className="text-xl font-semibold text-center text-black border-b-2">
              Cost Per Month
            </h2>
            <div>
              <Chart_MostDownloadedIndustry />
            </div>
          </div>

          <div className="md:col-span-1 p-3">
            <div className="grid grid-cols-4 gap-4">
              {data_card.map((dt, index) => {
                return (
                  <div
                    key={index}
                    className="shadow-lg shadow-blue-200 col-span-2 p-4"
                  >
                    <div className="flex justify-center">
                      <div className="bg-blue-200 bg-opacity-60 text-blue-500 w-fit items-center rounded-full p-3">
                        {dt.icons}
                      </div>
                    </div>
                    {/* Texts */}
                    <div className="flex justify-center items-center">
                      <h3 className="text-3xl font-bold text-gray-600">
                        {dt.number}
                      </h3>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="text-xl my-2 text-gray-600">{dt.text}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="text-red-400">{dt.percentage}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="md:col-span-2 shadow-xl shadow-blue-200 pb-8 pr-5"
            style={{ height: "380px", width: "100%" }}
          >
            <MyBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
