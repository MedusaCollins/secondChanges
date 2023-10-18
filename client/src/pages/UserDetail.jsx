import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UserDetail = () => {
    const { userName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DB}/profiles/${userName}`)
            .then((response) => {
                if (response.status === 200) {
                    setIsLoading(false);
                    setUser(response.data);
                    console.log(response.data)
                } else {
                    setIsLoading(true);
                }
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [userName]);

    if (isLoading || !user) {
        return (
            <div>Böyle bir kullanıcı bulunamadı.</div>
        );
    }

    return (
        <div>
            <div className='p-5 mx-24 gap-4 items-center flex flex-col bg-gray-500'>
                <div className='flex text-left gap-5 flex-col'>
                    <img src={user.img} alt="Seller" className='rounded-full w-44 h-44 border-2'/>
                    <span className='text-2xl font-normal'>{user.username}</span>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}


export default UserDetail