import React from 'react';

const Card = ({ item }) => {
    return (
        <div className=" py-2 border-b-2 mx-4 border-gray-300 hover:cursor-pointer">
            <div>
                <h1 className='text-lg font-semibold'>{item.id}</h1>
                <h2 className='text-start italic'>{item.name}</h2>
                <p className='text-start'>{item.email}</p>
                <p className='text-start text-gray-500'>{item.address}</p>
            </div>
        </div>
    );
};

export default Card;