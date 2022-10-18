import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";

export default function ReqAuc() {
  const { runContractFunction: RequestAuckland } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x6C1Ca71E779538631801E308d852f83aAd882021",
    functionName: "requestAuckland",
    params: {},
  });

  return (
    <div>
      <button
        className="bg-green-500/50        hover:bg-green-700/50 text-black font-bold py-2 px-4 rounded ml-auto"
        onClick={() => RequestAuckland()}
      >
        Request updated Auckland reading
      </button>
    </div>
  );
}
