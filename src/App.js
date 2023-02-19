import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]); // useState is a type of hook. It enables react to render the right elements and components when 'accounts' and 'setAccounts' get updated
  
  return (
    <div>
      <Navbar accounts={accounts} setAccounts={setAccounts}></Navbar>
      <Home accounts={accounts} setAccounts={setAccounts}></Home>
    </div>
  );
}

export default App;


/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */