// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const LoginPage = () => {
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-6">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               <form>
//                 <div className="form-group">
//                   <label>Email address</label>
//                   <input type="email" className="form-control" placeholder="Enter email" />
//                 </div>
//                 <div className="form-group mb-4">
//                   <label>Password</label>
//                   <input type="password" className="form-control" placeholder="Password" />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">Login</button>
//               </form>
//               <p className="mt-3 text-center">
//                 Don't have an account? <Link to="/signup">Signup</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default LoginPage;

