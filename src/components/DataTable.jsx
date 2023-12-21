import React from "react";
import chartUp from "/images/assets/chart-up.svg";
import chartDown from "/images/assets/chart-down.svg";
import { chartsApi } from "../services/coinApi";
export default function DataTable({ allCoins, setChartData, setIsShowModal }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto md:table-fixed w-full">
        <thead className="border-b-2 border-white pb-5 ">
          <tr className="child:text-center child:py-5">
            <th>coin</th>
            <th>name</th>
            <th>price</th>
            <th>24h</th>
            <th>totalVolume</th>
            <th>chart</th>
          </tr>
        </thead>
        <tbody>
          {allCoins.map((coin) => (
            <DataRow
              coin={coin}
              key={coin.id}
              setIsShowModal={setIsShowModal}
              setChartData={setChartData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const DataRow = ({ coin, setIsShowModal, setChartData }) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    price_change_percentage_24h: price_change,
    current_price,
  } = coin;
  const showHandler = async () => {
    const res = await fetch(chartsApi(id, 7));
    const json = await res.json();
    setIsShowModal(true);
    setChartData({ ...json, coin });
  };
  return (
    <tr className="child:py-2.5 child:px-5 child:text-center child:font-medium child:text-sm">
      <td className="cursor-pointer" onClick={showHandler}>
        <div className="flex items-center gap-x-2 lg:gap-x-5 min-w-max">
          <img className="w-10 h-10" src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td className="!px-10">{name.toUpperCase()}</td>
      <td>${current_price.toLocaleString()}</td>
      <td
        className={`${
          price_change > 0 ? "text-green-500" : "text-red-500"
        } w-40 md:w-auto`}
      >
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td className="px-10 min-w-[100px] md:w-auto">
        <img
          className="shrink-0 w-full h-full md:w-auto md:h-auto"
          src={price_change > 0 ? chartUp : chartDown}
          alt={name}
        />
      </td>
    </tr>
  );
};

export { DataRow };
