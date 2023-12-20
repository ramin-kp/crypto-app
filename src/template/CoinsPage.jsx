import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { Rings } from "react-loader-spinner";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { CoinsApi } from "../services/coinApi";

export default function CoinsPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [isLoading, setIsLoading] = useState(true);
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
  return (
    <div className="container">
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
          <DataTable allCoins={coins} />
        </>
      )}
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
