import './App.css';
import { db } from './firebase_config';
import React, { useState, useEffect } from 'react';
import CreatePosts from './components/CreatePosts';
import { collection, doc, getDocs } from 'firebase/firestore';
import Posts from './components/Posts';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

// TODOS
// blog post app just making the dashboard 
// be able to create and post blog posts 
// each post is compared of header image and descriction

function App() {
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState(null);
  const collectionRef = collection(db, 'post');

  const getPosts = async () => {
    const postsCol = await getDocs(collectionRef);
    setPosts(postsCol.docs.map((d) => ({...d.data(), id: d.id})));
  };

  const getFirstCharacter = (username) => {
    return username.charAt(0);
  }

  useEffect(() => {
    getPosts();
    setRefresh(false);
  }, [ refresh ])

  return (
    <div className='flex flex-col grid justify-items-center	p-1'>
      <div 
        className="flex w-2/3 text-xl rounded-lg space-x-4 content-center justify-between shadow-xl shadow-blue-500/50 hover:shadow-indigo-500/40 p-2"
      >
          <div className='font-medium' >DashBoard</div>
          <CreatePosts flag={setRefresh} />
      </div>
      { posts ? (
        posts.map((post) => (
          <div className='flex flex-col shadow-xl w-2/3 my-4 bg-slate-300 rounded-lg' key={post.id}>
            <div className='m-2 space-y-3'>
              <div className='flex space-x-3 items-center'>
                  <Avatar>{post.username.charAt(0).toUpperCase()}</Avatar>
                  <div className='font-bold text-lg'>
                      {post.username}
                  </div>
              </div>
              <div className='grid justify-items-center'>
                  <img className='w-3/5' src={post.image} alt='Oh No, image not found'/>
              </div>
              <div className='text-lg flex space-x-2'>
                  <div className='font-bold' >{post.username}</div>
                  <div >{post.description}</div>
              </div>
            </div>
          </div>
        ))
      ) : <CircularProgress /> }
    </div>
  );
}

export default App;
