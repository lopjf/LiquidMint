import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';	
import React from 'react'
import liquidSquid from './LiquidSquid.json';	// this enable us to grab the ABI, to connect to our contract

const liquidSquidAddress = "0x593E0473ec5321C5622A1F7aB96698586c71E81d";

const buttonPerso = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4";

const minAmount = 1;
const maxAmount = 50;

const Home = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1);
	const isConnected = Boolean(accounts[0]);

	async function handleMint() {
		// all of this is necessary so we can use the contract functions
		if (window.ethereum) {	// if the user is connected (loged in to metamask)
			const provider = new ethers.providers.Web3Provider(window.ethereum);	// this provides a way for ethers to connect to the blockchain. It is a initial set-up
			const signer = provider.getSigner();	// for every transaction we need a signer. something that signs the transactions
			const contract = new ethers.Contract(
				liquidSquidAddress,
				liquidSquid.abi,
				signer
			);
			try {		// BigNumber is used because Solidity requires it
				const response = await contract.mint(BigNumber.from(mintAmount), {
					value: ethers.utils.parseEther((0.02 * mintAmount).toString()),	// we're passing the mint price
				});	// call the smart contract function mint
				console.log('response: ', response);	// the response doesn't really matter but we still check it
			} catch (err) {	// if anything failes then we catch it to give an error, just in case
				console.log("error: ", err)
			}
		}
	}

	const handleDecrement = () => {	// this will be run when we click the 'minus' button
		if (mintAmount <= minAmount) return;
		setMintAmount(mintAmount - 1);
	};

	const handleIncrement = () => {	// this will be run when we click the 'plus' button
		if (mintAmount >= maxAmount) return;
		setMintAmount(mintAmount + 1);
	};
	
	return (
	<div>
		{/* 1st page */}
		<div className="bg-slate-100 min-h-screen">
			<div className="flex flex-col items-center pt-60 pb-80">
				<h1 className="text-5xl">TITLETITLE</h1>
				<div className="mt-40 flex justify-evenly items-center w-1/2">
					<p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.</p>
					<button type="button" className="whitespace-nowrap ml-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4">MINT NOW</button>
				</div>
			</div>
		</div>

		{/* 2nd page */}
		<div className="bg-gradient-to-r  min-h-screen">
			<div className="flex flex-col items-center text-center pt-40">
				<h1 className="text-5xl">TITLETITLE</h1>
				{isConnected ? (
					<>
					<p className="pt-20 text-2xl w-1/2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eaque suscipit minima ipsum laborum autem dolores illo ex obcaecati aliquid!</p>
					<div className="mt-40 flex justify-evenly items-center w-1/4">
						<button type="button" onClick={handleDecrement} className= {buttonPerso} >-</button>
						<input type="number" value={mintAmount} className="text-center w-10 mx-2" />
						<button type="button" onClick={handleIncrement} className= {buttonPerso}>+</button>
					</div>
					<button type="button" className="whitespace-nowrap mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4">MINT NOW</button>
					</>
				) : (
					<p className="pt-60 text-2xl w-1/2 text-red-500">Please connect your wallet to continue.</p>
				)}
			</div>
		</div>

	</div>
  )
}

export default Home
