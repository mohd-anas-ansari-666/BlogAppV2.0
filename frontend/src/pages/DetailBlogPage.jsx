// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const DetailBlogPage = () => {
//   const { id } = useParams();
//   const blog = { title: `Blog ${id}`, content: `This is the full content of blog ${id}.` };

//   return (
//     <div className="container mt-5">
//       <h2>{blog.title}</h2>
//       <p>{blog.content}</p>
//       <Link to="/" className="btn btn-secondary">Back</Link>
//     </div>
//   );
// }

// export default DetailBlogPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DetailBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}

export default DetailBlogPage;
