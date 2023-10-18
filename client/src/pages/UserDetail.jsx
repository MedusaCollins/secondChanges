import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../components/Home/Products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const UserDetail = ({ handleLogin, pUser }) => {
    const { userName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [rating, setRating] = useState();
    const [filters, setFilters] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_DB}/profiles/${userName}`);
                if (userResponse.status === 200) {
                    setUser(userResponse.data);
                    setFilters({seller: userResponse.data._id})

                    // Ürünleri filtrele ve güncelle
                    const ratings = userResponse.data.reviews.map(review => review.rating);
                    if (ratings.length > 0) {
                        const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
                        const averageRating = totalRating / ratings.length;
                        setRating(averageRating.toFixed(1));
                    } else {
                        console.log('Henüz hiç rating yok.');
                    }

                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [userName]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DB}/api/products`, filters)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => console.error(error));
      }, [filters]);

    if (isLoading || !user) {
        return (
            <div>Böyle bir kullanıcı bulunamadı.</div>
        );
    }
    return (
        <div>
           <div className='p-5 mx-24 items-center grid grid-cols-5'>
            <div className='row-span-1 col-span-1 text-center text-blue-400 sticky top-32 border-2 mx-5 p-5 rounded-xl'>
                <img src={user.img} alt="Seller" className='rounded-full w-52 h-52 mx-auto border-2 sticky mb-5'/>
                <span className='text-2xl font-normal'>{user.username}</span>
                    {user.username===pUser.username&&(
                        <div className='text-white bg-blue-400 hover:bg-blue-500 p-2 my-5 rounded-lg hover:cursor-pointer'>
                            Edit Profile
                        </div>
                    )}

                    <div className='p-2 text-center text-black'>
                        {rating>0?(
                        <>
                        <FontAwesomeIcon icon={solidStar} className='text-orange-500 text-left'/> {rating}<span className='text-gray-500'>/5 ({user.reviews.length} reviews)</span>
                        </>
                        ):<span className='text-gray-500'>{user.reviews.length} reviews</span>}
                    </div>
            </div>


            <div className='row-span-1 col-span-4 justify-center border-2 rounded-xl p-5'>
                <div>
                <h1 className='text-xl font-semibold'>{user.username} {products.length > 0 ? <span className='text-gray-300'>({products.length})</span> : <span className='text-red-500'>(Ürün yok)</span>}</h1>

                </div>
                <div>
                <Products filter={filters} user={user} handleLogin={handleLogin}/>
                </div>
            </div>
            </div>
        </div>
    );
}

export default UserDetail;
