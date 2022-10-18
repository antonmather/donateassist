import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";
import { useState } from "react";

export default function Deposit() {
  const [amount, setAmount] = useState("0");

  const { runContractFunction } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x6C1Ca71E779538631801E308d852f83aAd882021",
    functionName: "deposit",
    msgValue: amount,
    params: {},
  });

  function set(e) {
    setAmount(e.target.value * 1000000000000000000);
  }

  return (
    <div className="py-2">
      <form className="bg-sky-500/50 hover:bg-sky-700/50  text-black font-bold py-2 px-4 rounded w-60">
        <input type="number" onChange={(e) => set(e)} />
        ETH
      </form>
      <div className="py-0.5"></div>
      <button
        div
        className="bg-sky-500/50 hover:bg-sky-700/50 text-black font-bold
        py-2 px-4 rounded ml-auto"
        onClick={() => runContractFunction()}
      >
        Deposit
      </button>
    </div>
  );
}
//10000000000000000
