import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect, useState} from 'react';
import './App.css';
import Web3 from 'web3'
import ElectionABI from './contracts/Election.json'
import Navbar from "./Navbar";
import Body from "./Body"

function App() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [loader, setLoader] = useState(true);
    const [Election,setElection] = useState();
    const [candidate1, setCandidate1] = useState();
    const [candidate2, setCandidate2] = useState();
    useEffect(() => {
        loadWeb3();
        connectBlockChainData();
    },[]);
    const voteCandidate= async(candidateId) => {
        setLoader(true)
        await Election
            .methods
            .Vote(candidateId)
            .send({from : currentAccount})
            .on("transactionHash", () =>{
                console.log("successfully voted")
            })
        setLoader(false)
    }
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    const connectBlockChainData = async() =>{
        const web3 = await new Web3(Web3.givenProvider || "http://localhost:8545")
        const accounts = await web3.eth.getAccounts()
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
        const networkId = await web3.eth.net.getId();
        const networkData = ElectionABI.networks[networkId];
        if(networkData){
            const election = new web3.eth.Contract(ElectionABI.abi,networkData.address);
            setElection(election);
            const candidate1= await election.methods.candidates(1).call();
            const candidate2= await election.methods.candidates(2).call();
            setCandidate1(candidate1);
            setCandidate2(candidate2);
            console.log(candidate1);
            setLoader(false);
        }
        else{
            window.alert("Smart contract is not deployed current network");
        }
    }
    if(loader){
        return <div>Please hold on, loading!!!</div>
    }
  return (
    <div className="App">
        <Navbar account = {currentAccount}/>
        <Body candidate1={candidate1} candidate2={candidate2} vote ={voteCandidate}/>
    </div>
  );
}

export default App;
