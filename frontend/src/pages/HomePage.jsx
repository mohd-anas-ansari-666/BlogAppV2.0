// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//   const blogs = [
//     { id: 1, title: "Blog 1", content: "This is a short snippet of blog 1." },
//     { id: 2, title: "Blog 2", content: "This is a short snippet of blog 2." },
//     // Add more blog data as needed
//   ];

//   return (
//     <div className="container mt-5">
//       <h2>Blogs</h2>
//       <div className="row">
//         {blogs.map((blog) => (
//           <div className="col-md-4" key={blog.id}>
//             <div className="card mb-4">
//               <div className="card-body">
//                 <h5 className="card-title">{blog.title}</h5>
//                 <p className="card-text">{blog.content}</p>
//                 <Link to={`/blog/${blog.id}`} className="btn btn-primary">Read More</Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4" key={blog._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                <Link to={`/blog/${blog._id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
