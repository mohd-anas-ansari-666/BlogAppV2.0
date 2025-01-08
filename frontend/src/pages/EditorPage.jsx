// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const EditorPage = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle blog submission logic
//     console.log("Blog submitted:", { title, content });
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-body">
//           <h2 className="card-title text-center mb-4">Create a New Blog</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 className="form-control"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter title"
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="content" className="form-label">Content</label>
//               <textarea
//                 id="content"
//                 className="form-control"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Enter content"
//                 rows="5"
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Publish</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditorPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditorPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to create a blog');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/blogs`, { title, content }, {
        headers: {
          'x-auth-token': token
        }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error creating blog');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditorPage;
