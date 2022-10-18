import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi.js";
import { useMoralis } from "react-moralis";

export default function Auc() {
  const { isWeb3Enabled } = useMoralis();
  const { runContractFunction: Auc24 } = useWeb3Contract({
    abi: abi,
    contractAddress: "0x6C1Ca71E779538631801E308d852f83aAd882021",
    functionName: "Auc24",
    params: {},
  });

  // tells react that your component needs to do something. here we are saying that it needs to read from blockchain after checking to see
  // if the wallet is connected. i think.

  //this is okay but we need something to rerender the page
  //let Auc24fromContract = "";
  //setAuc24fromContract is the function that will update the state

  const [Auc24fromContract, setAuc24fromContract] = useState("0");

  useEffect(() => {
    if (isWeb3Enabled) {
      //try to read weather in Auckland from blockchain
      //need asynic to wait to update UI
      async function updateUI() {
        const Auc24FromCall = (await Auc24()).toString();
        setAuc24fromContract(Auc24FromCall / 100);
        console.log(Auc24fromContract);
      }
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="text-black font-bold py-2 ml-auto">
      Current Auckland reading stored on blockchain: {Auc24fromContract}mm
    </div>
  );
}
