import { db, storage } from '../firebase_config';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import React, { useState } from 'react';
import { Avatar, Button, Dialog, DialogTitle, 
    DialogContent, DialogActions, DialogContentText, TextField } from '@mui/material';
import { username } from './Usernames';

// TODOS
// blog post app just making the dashboard 
// be able to create and post blog posts 
// each post is compared of header image and descriction

function CreatePosts({flag}) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [fileURL, setFileURL] = useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const createFile = async (e) => {
        const file = e.target.files[0]
        const fileRef = ref(storage, file.name)
        await uploadBytes(fileRef, file).then((snapshot) => {
            console.log("Uploaded blob or image")
        })
        await setFileURL(await getDownloadURL(fileRef));
    }

    const createPost = async (e) => {
        e.preventDefault();
        const ran = Math.floor(Math.random() * username.length)
        console.log(ran)
        console.log(username[ran]);
        await addDoc(collection(db, 'post'), {
            description: text,
            image: await fileURL,
            username: username[ran]
        });

        setText("");
        setFileURL(null);
        flag(true);
        handleClose();
    }

  return (
    <div>
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth={true} >
          <DialogTitle>Create Posts</DialogTitle>
          <DialogContent>
              <div className='flex flex-col space-y-4 '>
                    {fileURL ? <img className='w-2/5 h-2/5' src={fileURL} alt="Oh No" /> : ''}
                    <input type='file' onChange={(e) => createFile(e)} />
                    <TextField 
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        value={text}
                        placeholder='Create post'
                    ></TextField>
              </div>
          </DialogContent>
          <DialogActions>
              <Button onClick={createPost} variant='contained' >Post</Button>
          </DialogActions>
      </Dialog>
      <button 
        className='rounded-lg shadow-xl px-8 py-1 text-xl bg-purple-500 hover:bg-purple-600 text-white font-medium' 
        onClick={handleClickOpen} 
      >
          Create
      </button>
    </div>
  );
}

export default CreatePosts;
