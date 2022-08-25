import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";

export default function Withdraw() {
  const { runContractFunction } = useWeb3Contract({
    abi: abi,
    contractAddress: "0xaf23fcbc38b2934b81fc54616bd3baec9701c810",
    functionName: "withdraw",
    params: {},
  });

  return (
    <div ClassName="py-2">
      <button
        className="bg-orange-600/50        hover:bg-orange-800/50 text-black font-bold py-2 px-4 rounded ml-auto"
        onClick={() => runContractFunction()}
      >
        Initiate Withdrawal
      </button>
    </div>
  );
}
