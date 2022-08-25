import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";

export default function Deposit() {
  const { runContractFunction } = useWeb3Contract({
    abi: abi,
    contractAddress: "0xaf23fcbc38b2934b81fc54616bd3baec9701c810",
    functionName: "deposit",
    msgValue: "10000000000000000",
    params: {},
  });

  return (
    <div className="py-2">
      <button
        className="bg-sky-500/50        hover:bg-sky-700/50 text-black font-bold py-2 px-4 rounded ml-auto"
        onClick={() => runContractFunction()}
      >
        Deposit
      </button>
    </div>
  );
}
//10000000000000000
