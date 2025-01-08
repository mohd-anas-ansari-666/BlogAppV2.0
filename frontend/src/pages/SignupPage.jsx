// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './customstyles.css';

// const SignupPage = () => {
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-6">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Signup</h2>
//               <form>
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input type="text" className="form-control" placeholder="Enter name" />
//                 </div>
//                 <div className="form-group">
//                   <label>Email address</label>
//                   <input type="email" className="form-control" placeholder="Enter email" />
//                 </div>
//                 <div className="form-group mb-4">
//                   <label>Password</label>
//                   <input type="password" className="form-control" placeholder="Password" />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">Signup</button>
//               </form>
//               <p className="mt-3 text-center">
//                 Already have an account? <Link to="/login">Login</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response.data); // Log the server error response
      alert(`Error registering: ${err.response.data.message || 'Unknown error'}`); // Display a more detailed error message
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
