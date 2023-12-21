import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { Rings } from "react-loader-spinner";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { CoinsApi } from "../services/coinApi";
import Charts from "../components/Charts";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function CoinsPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [type, setType] = useState("prices");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await fetch(CoinsApi(page, currency));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };
    getData();
  }, [page, currency]);
  console.log(chartData);
  return (
    <div className="container">
      <Layout />
      <Search currency={currency} setCurrency={setCurrency} />
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[1000px]">
          <Rings
            height="200"
            width="200"
            color="#e11d48"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <>
          <DataTable
            allCoins={coins}
            setChartData={setChartData}
            setIsShowModal={setIsShowModal}
          />
        </>
      )}
      <Pagination page={page} setPage={setPage} />
      {isShowModal && (
        <Charts
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          chartData={chartData}
          type={type}
          setType={setType}
          coins={coins}
        />
      )}
      <Footer />
    </div>
  );
}
