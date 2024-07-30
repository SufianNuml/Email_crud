import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Emails_display from './components/Emails_display';
import Updateproduct from './components/Updateproduct';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState("");

  const getData = (e) => {
    e.preventDefault();
    console.log(email);
    axios.post("http://localhost:5000/login",{email})
    .then(result=> {console.log(result)
      })
    .catch(err => console.log(err))
  };

  return (
    <div className="App">
      <h1>Register here</h1>
      <form onSubmit={getData}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <br/>

    
     <BrowserRouter>
     
     <Routes>
     <Route path='/' element={ <Emails_display/>} />
     <Route path='/update/:id' element={<Updateproduct/>}/>
     </Routes>
        
     
     </BrowserRouter>
     
    </div>
    
  );
}

export default App;
