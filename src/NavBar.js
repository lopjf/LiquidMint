import React from 'react'

const NavBar = ({ accounts, setAccounts }) => {

  const isConnected = Boolean(accounts[0]);	// account[0] is the address of the wallet. This detect when we are connected versus when we are not connected

	async function connectAccount() {
		if (window.ethereum) {	// when using Metamask, it injects the app with window.ethereum. So this checks if that exist, if so it...
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",		// that gives us all the accounts that exist in the metamask wallet
			});
			setAccounts(accounts);	// this update the State in App.js
		}
	}

  return (


<nav className="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
  <a href="#" className="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap">Flowbite</span>
  </a>

  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
  <ul className="flex items-center flex-col p-4 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
      <li>
      <a href="https://twitter.com/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Twitter Logo" />
      </a>
      </li>
      <li>
      <a href="https://web.telegram.org/k/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Twitter Logo" />
      </a>
      </li>
      <li>
      <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Mint</a>
      </li>
      <li>
      <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">NFTnomics</a>
	    </li>
      <li>
      {isConnected ? (
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">Connected</button>
      ) : (
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0" onClick={connectAccount()}>Connect</button>
      )}
      </li>
    </ul>
    </div>

    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
      



  </div>
</nav>


  )
}

export default NavBar
