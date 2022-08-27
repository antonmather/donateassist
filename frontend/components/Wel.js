import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";
import { useMoralis } from "react-moralis";

export default function Wel() {
  const { isWeb3Enabled } = useMoralis();
  const { runContractFunction: Wel24 } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x5fa257f6BB0ABD7de46484a82b889a23B1d2d713",
    functionName: "Wel24",
    params: {},
  });

  const [Wel24fromContract, setWel24fromContract] = useState("0");

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const Wel24FromCall = (await Wel24()).toString();
        setWel24fromContract(Wel24FromCall / 100);
        console.log(Wel24fromContract);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="text-black font-bold py-2 ml-auto">
      Current Wellington reading stored on blockchain: {Wel24fromContract}
      mm
    </div>
  );
}
