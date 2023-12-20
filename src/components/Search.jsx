import React, { useEffect, useState } from "react";
import { searchApi } from "../services/coinApi";
import { Rings } from "react-loader-spinner";

export default function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    if (!text) {
      setIsLoading(false);
      setCoins([]);
      return;
    }
    const controller = new AbortController();
    const getSearchApi = async () => {
      try {
        const res = await fetch(searchApi(text), { signal: controller.signal });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          setIsLoading(false);
          setText("");
          alert("بیش از حد درخواست فرستادین");
        }
      } catch (error) {
        if (error.name !== "AbortError") alert(error.message);
      }
    };
    setIsLoading(true);
    getSearchApi();
    return () => controller.abort();
  }, [text]);
  return (
    <div className="relative py-10">
      <input
        className="px-2.5 py-2 font-medium bg-transparent outline-none rounded border border-slate-600"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="px-2.5 py-2 ml-5 font-medium child:font-medium bg-transparent child:bg-black child:text-white border border-slate-600 text-white rounded"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className="absolute inset-0 top-[90px] w-[250px] h-[300px] p-2.5  bg-zinc-800 rounded overflow-y-auto no-scrollbar">
          {isLoading && (
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
          )}
          <ul className="divide-y divide-zinc-700 font-medium">
            {coins.map((coin) => (
              <li key={coin.id} className="py-2.5">
                <div className="flex items-center gap-2">
                  <img src={coin.thumb} alt={coin.name} />
                  <span>{coin.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
