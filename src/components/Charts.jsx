import { useEffect, useState } from "react";
import { covertData } from "../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function Charts({ setIsShowModal, chartData, type, setType }) {
  const { coin } = chartData;
  const [data, setData] = useState([]);
  console.log(chartData);

  useEffect(() => {
    setData(covertData(chartData, type));
  }, [type]);

  return (
    <div className=" fixed top-0 left-0 backdrop-blur-sm w-full h-full mx-3 overflow-x-auto">
      <span
        className="inline-block mt-10 ml-10 px-2 py-1 bg-red-500 text-white rounded  cursor-pointer"
        onClick={() => setIsShowModal(false)}
      >
        X
      </span>

      <div className="flex flex-col justify-between w-[500px] lg:w-[1200px] h-[600px]  mx-auto mt-16 p-5 bg-zinc-800 border border-slate-600 rounded-xl">
        <div className="flex items-center gap-x-5 w-10 h-10 my-2.5 font-medium">
          <img src={coin.image} alt={coin.name} />
          <span>{coin.name}</span>
        </div>

        <ResponsiveContainer width="100%" height="60%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 15,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} hide />
            <YAxis dataKey={type} domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={type}
              stroke="#0ea5e9"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div>
          <div className="flex-center gap-x-4 my-5">
            <button
              className={`${
                type === "prices" ? "bg-blue-500" : "bg-transparent"
              } px-2.5 py-2 border border-blue-500 hover:bg-blue-600 transition-all rounded`}
              onClick={() => setType("prices")}
            >
              prices
            </button>
            <button
              className={`${
                type === "market_caps" ? "bg-blue-500" : "bg-transparent"
              } px-2.5 py-2 border border-blue-500 hover:bg-blue-600 transition-all rounded`}
              onClick={() => setType("market_caps")}
            >
              marketCaps
            </button>
            <button
              className={`${
                type === "total_volumes" ? "bg-blue-500" : "bg-transparent"
              } px-2.5 py-2 border border-blue-500 hover:bg-blue-600 transition-all rounded`}
              onClick={() => setType("total_volumes")}
            >
              totalVolumes
            </button>
          </div>
          <div className="flex items-center justify-between gap-x-5 child:flex child:items-end child:gap-x-2.5 mt-5">
            <div>
              <p className="text-blue-500 font-bold text-xl">prices:</p>
              <span>${coin.current_price}</span>
            </div>
            <div>
              <p className="text-blue-500 font-bold text-xl">ATH:</p>
              <span>{coin.ath}</span>
            </div>
            <div>
              <p className="text-blue-500 font-bold text-xl">MarketCap:</p>
              <span>{coin.market_cap}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
