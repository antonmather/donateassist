// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DonateAssist is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    constructor() {
        setChainlinkToken(link);
        setChainlinkOracle(oracle);
    }

    struct Conditions {
        uint256 timestamp;
        uint24 precipitationPast12Hours;
        uint24 precipitationPast24Hours;
        uint24 precipitationPastHour;
        uint24 pressure;
        int16 temperature;
        uint16 windDirectionDegrees;
        uint16 windSpeed;
        uint8 precipitationType;
        uint8 relativeHumidity;
        uint8 uvIndex;
        uint8 weatherIcon;
    }

    struct Location{
        string name;
        address payable add;
        string lat;
        string lon;
    }

    uint24 FloodingThreshold = 30000; 

    Location Auckland     = Location( "Auckland", payable(0x3E2bF52997381D2333a7d3d391ac904e472d1103), "-36.848461", "174.763336");
    Location Wellington   = Location( "Wellington", payable(0xA2c1a145BcD3601F89f7522EB79b7e7a03625bEa), "-41.2924", "174.7787");
    Location Christchurch = Location( "Christchurch", payable(0x81F28fA9429b905ed51Bc02f34a4D39a00829889), "-43.5320", "172.6306");

    address link = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    address oracle = 0xB9756312523826A566e222a34793E414A81c88E1;
    bytes32 jobID = 0x3763323736393836653233623462316339393064383635396263613761396430;
    uint256 payment = 100000000000000000;
    string units = "metric";

    uint24 public Auc24;
    uint24 public Wel24;
    uint24 public Chr24;

    //Any excess funds can be sent to anyone
    uint256 public Pot; 
    
    mapping(address => uint256) public FunderBalances;

    //This is the oracle request to the AccuWeather Chainlink node

    function requestAuckland() public
    {
        Chainlink.Request memory req = buildChainlinkRequest(jobID, address(this), this.callbackAuc.selector);
        req.add("endpoint", "location-current-conditions");
        req.add("lat", Auckland.lat);
        req.add("lon", Auckland.lon);
        req.add("units", units);
        sendChainlinkRequest(req, payment);
    }
    
    //This pulls out the rainfall data from the returned oracle request

    function callbackAuc(bytes32 _requestId, bool _locationFound, bytes memory _locationResult, bytes memory _Conditions) public
    {
        Auc24 = abi.decode(_Conditions, (Conditions)).pressure;//For testing purposes, replace with "precipitationPast24Hours" in production;
    }
    
    function requestWellington() public
    {
        Chainlink.Request memory req = buildChainlinkRequest(jobID, address(this), this.callbackWel.selector);
        req.add("endpoint", "location-current-conditions");
        req.add("lat", Wellington.lat);
        req.add("lon", Wellington.lon);
        req.add("units", units);
        sendChainlinkRequest(req, payment);
    }
    
    function callbackWel(bytes32 _requestId, bool _locationFound, bytes memory _locationResult, bytes memory _Conditions) public
    {
        Wel24 = abi.decode(_Conditions, (Conditions)).pressure;//For testing purposes, replace with "precipitationPast24Hours" in production;
    }

    function requestChristchurch() public
    {
        Chainlink.Request memory req = buildChainlinkRequest( jobID, address(this), this.callbackChr.selector);
        req.add("endpoint", "location-current-conditions");
        req.add("lat", Christchurch.lat);
        req.add("lon", Christchurch.lon);
        req.add("units", units);
        sendChainlinkRequest(req, payment);
    }
    
    function callbackChr(bytes32 _requestId, bool _locationFound, bytes memory _locationResult, bytes memory _Conditions) public
    {
        Chr24 = abi.decode(_Conditions, (Conditions)).precipitationPast24Hours;
    }

    //Deposit function, deposits from cities are identified, other deposits are added to the Pot

    function deposit() public payable
    {
        if (msg.sender==Auckland.add || msg.sender==Wellington.add || msg.sender==Christchurch.add)
        {
            FunderBalances[msg.sender] += msg.value;
        }
        else
        {
            Pot += msg.value;
        }
    }

    function withdraw() public
    {
        //Only allows someone who has deposited into the contract to initiate withdrawal
        require (address(this).balance > 0);
        
        //Needs some requirement that all three updated otherwise vulnerable to attack
        requestAuckland();
        requestWellington();
        requestChristchurch();

        require (Auc24>FloodingThreshold || Wel24>FloodingThreshold || Chr24>FloodingThreshold);
        //If reaching here then somewhere is flooded.

        uint24 a = Auc24 > FloodingThreshold ? Auc24 - FloodingThreshold : 0;
        uint24 w = Wel24 > FloodingThreshold ? Wel24 - FloodingThreshold : 0;
        uint24 c = Chr24 > FloodingThreshold ? Chr24 - FloodingThreshold : 0;
        uint24 total = a + w + c;
    
        //For recording upcoming distribtions
        uint256 newAuc = 0;
        uint256 newWel = 0;
        uint256 newChr = 0;

        //Adds the Pot share to the cities according to the level of rainfall
        newAuc = FunderBalances[Auckland.add]     + Pot * a / total;
        newWel = FunderBalances[Wellington.add]   + Pot * w / total;
        newChr = FunderBalances[Christchurch.add] + Pot * c / total;

        Pot=0; 
        //Pot should now be empty

        //Plus contributions from others who didn't flood (these numbers will be zero if so)
        //The unaffected city's fund is divided according to the level of rainfall
        if (a==0)
        {
            uint256 a2w = FunderBalances[Auckland.add] * w / total;
            newWel += a2w;
            newAuc -= a2w;
            uint256 a2c = FunderBalances[Auckland.add] * c / total;
            newChr += a2c;
            newAuc -= a2c;
        }
        if (w==0)
        {
            uint256 w2a = FunderBalances[Wellington.add] * a / total;
            newAuc += w2a;
            newWel -= w2a;
            uint256 w2c = FunderBalances[Wellington.add] * c / total;
            newChr += w2c;
            newWel -= w2c;
        }
        if (c==0)
        {
            uint256 c2w = FunderBalances[Christchurch.add] * w/total;
            newWel += c2w;
            newChr -= c2w;
            uint256 c2a = FunderBalances[Christchurch.add] * a/total;
            newAuc += c2a;
            newChr -= c2a;
        }

        //Withdraw funds and empty
        if(a>0){
            Auckland.add.transfer(newAuc);
            newAuc=0;
        }
        if(w>0){
            Wellington.add.transfer(newWel);
            newWel=0;
        }
        if(c>0){
            Christchurch.add.transfer(newChr);
            newChr=0;
        }

        //Update actual balances
        FunderBalances[Auckland.add] = newAuc;
        FunderBalances[Wellington.add] = newWel;
        FunderBalances[Christchurch.add] = newChr;
    }
}
