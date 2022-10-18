import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";
import { useMoralis } from "react-moralis";

export default function Wel() {
  const { isWeb3Enabled } = useMoralis();
  const { runContractFunction: Wel24 } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x6C1Ca71E779538631801E308d852f83aAd882021",
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
