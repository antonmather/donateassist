import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";

export default function ReqWel() {
  const { runContractFunction: RequestWellington } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x5fa257f6BB0ABD7de46484a82b889a23B1d2d713",
    functionName: "requestWellington",
    params: {},
  });

  return (
    <div>
      <button
        className="bg-green-500/50        hover:bg-green-700/50 text-black font-bold py-2 px-4 rounded ml-auto"
        onClick={() => RequestWellington()}
      >
        Request updated Wellington reading
      </button>
    </div>
  );
}
