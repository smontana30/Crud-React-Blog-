/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Avatar from '@mui/material/Avatar';

function Posts(data, id) {
console.log(data.image)
    return(
        <div className='shadow-xl' key={id}>
            <div>
                <Avatar>{data.username}</Avatar>
                <div>
                    {data.username}
                </div>
            </div>
            <div>
                <img src={data.image} alt='Oh No, image not found'/>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Posts;