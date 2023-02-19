import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';	
import React from 'react'
import liquidSquid from './LiquidSquid.json';	// this enable us to grab the ABI, to connect to our contract

const liquidSquidAddress = "0x593E0473ec5321C5622A1F7aB96698586c71E81d";

const buttonPerso = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

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
		if (mintAmount <= 1) return;
		setMintAmount(mintAmount - 1);
	};

	const handleIncrement = () => {	// this will be run when we click the 'plus' button
		if (mintAmount >= 3) return;
		setMintAmount(mintAmount + 1);
	};
	
	return (
	<div>
		<div class="bg-gradient-to-r from-indigo-500 min-h-screen">
			<div class="flex flex-col items-center pt-60 pb-80">
				<h1 class="text-5xl">TITLETITLE</h1>
				<div class="mt-40 flex justify-evenly items-center w-1/2">
					<p class="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.</p>
					<button type="button" class="whitespace-nowrap ml-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">MINT NOW</button>
				</div>
			</div>
		</div>

		<div class="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
			<div class="flex flex-col items-center pt-60 pb-80">
				<h1 class="text-5xl">TITLETITLE</h1>
				{/* {isConnected ? (
				<Box margin="0 15px">Connected</Box>
				) : ( */}
				<p class="pt-20 text-2xl items-center w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.</p>
				<div class="mt-40 flex justify-evenly items-center w-1/4">
					<button type="button" class= {buttonPerso} >-</button>
					<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">display</button>
					<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
				</div>
				<button type="button" class="whitespace-nowrap mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-10 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">MINT NOW</button>
				{/* )} */}
			</div>
		</div>
	</div>
  )
}

export default Home
