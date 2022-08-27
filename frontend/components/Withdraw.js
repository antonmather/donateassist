import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";

export default function Withdraw() {
  const { runContractFunction } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x5fa257f6BB0ABD7de46484a82b889a23B1d2d713",
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
