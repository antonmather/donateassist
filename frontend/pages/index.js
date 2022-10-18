import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis } from "react-moralis";

import Header from "../components/Header";

import Deposit from "../components/Deposit";
import Withdraw from "../components/Withdraw";

import ReqAuc from "../components/ReqAuc";
import Auc from "../components/Auc";

import ReqWel from "../components/ReqWel";
import Wel from "../components/Wel";

import ReqChr from "../components/ReqChr";
import Chr from "../components/Chr";

export default function Home() {
  return (
    <div class={styles.container}>
      <Head>
        <title>DonateAssist</title>
        <meta name="description" content="Flood insurance application" />
      </Head>
      <nav>
        <Header />
      </nav>
      <div className="py-8 px-8">
        Transparent and verifiable distribution of funds to help local
        authorities respond to flooding
      </div>
      <figure class="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-300">
        <div className="py-4 px-8">
          Our dApp provides a form of pooled insurance for local authorities in
          the event of heavy rain and flooding, with funds being released if the
          24 hour rainfall amounts exceed a specified limit. This demo uses the
          rainfall readings for the New Zealand cities of Auckland, Wellington
          and Christchurch. In order to show the dApp distributing the funds,
          the values for Auckland and Wellington have been changed to give the
          pressure reading (hPa) instead of rainfall. As pressure readings
          (which return a value between 950 to 1050hPa) will always be over the
          300mm limit set in the smart contract, this will see the smart
          contract always trigger. It is unlikely in practice for two cities to
          suffer from simutaneous flooding events, however, the demo uses this
          to show how the smart contract would distribute funds if this was to
          occur.
        </div>
        <div className="py-2 px-8">
          The local authorities each have a designated blockchain wallet. When
          they deposit into the dApp, their contribution is assigned to that
          wallet. Other participants such as central governments,
          non-governmental organisations and everyday citizens are also able to
          contribute funds which are recorded in a separate "Pot" account. The
          distribution mechanism releases funds based on the amount of rainfall
          and the contribution of the city to the pooled fund.
        </div>
        <div className="py-2 px-8">
          If a city experiences heavy rainfall and flooding then they can update
          their rainfall reading through this page. If the
          reading confirms that the 24 hour rainfall limit has been breached
          then they can initiate the withdrawal (this incurs a higher cost than
          a simple reading update), which will then distribute the funds held by
          the contract. We note that this model can be easily and quickly
          adapted to any location worldwide and and to other weather events such
          as drought or high windspeed. Due to data availability limitations on
          the AccuWeather Kovan testnet oracle, this use case was selected as
          the most optimal to showcase the potential of our approach.
        </div>
      </figure>
      <div className="py-6 px-8">
        <i>
          Demo notes: 1) You must connect to a Web3 wallet in order for the
          rainfall values to display 2) After requesting a reading update or
          after initating a withdrawal, you must manually refresh the page after
          ~20 seconds to see the updated values. 3) Only the city wallets can
          initiate a withdrawal 4) Current contract address:
        https://goerli.etherscan.io/address/0x6c1ca71e779538631801e308d852f83aad882021
        </i>
      </div>
      <div className="grid grid-cols-2 py-1 px-4 gap-4 place-content-center">
        <div className="py-1 px-4">
          <Deposit />
          <Withdraw />
        </div>
        <div className="py-1 px-4">
          <Auc />
          <ReqAuc />
        </div>
        <div className="py-4 px-4">
          <Wel />
          <ReqWel />
        </div>
        <div className="py-4 px-4">
          <Chr />
          <ReqChr />
        </div>
      </div>
    </div>
  );
}
