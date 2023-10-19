import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Products from '../components/Home/Products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';

const UserDetail = ({ handleLogin, pUser }) => {
    const { userName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [rating, setRating] = useState();
    const [filters, setFilters] = useState();
    const [selected, setSelected] = useState('products')

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_DB}/profiles/${userName}`);
                if (userResponse.status === 200) {
                    setUser(userResponse.data);
                    console.log(userResponse.data)
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
           <div className='p-5 mx-24 grid grid-cols-5'>
                <div className='row-span-1 col-span-1 text-center text-blue-400 sticky border-2 top-52 -mt-52 mx-5 p-5 h-min rounded-xl' >
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

                <div className='row-span-1 col-span-4 justify-center'>
                    <div className='flex flex-row justify-around'>
                        <div className='rounded-tl-xl w-full text-center p-5 text-xl border-t-2 border-l-2 hover:cursor-pointer' onClick={()=> setSelected("products")} style={selected==="reviews"?{backgroundColor: '#E5E7EB'}:null}><FontAwesomeIcon icon={faShop} className=''/> Products</div>
                        <div className='rounded-tr-xl w-full text-center p-5 text-xl border-t-2 border-r-2 hover:cursor-pointer' onClick={()=> setSelected("reviews")} style={selected==="products"?{backgroundColor: '#E5E7EB'}:null}><FontAwesomeIcon icon={faComments} /> Reviews <span className='text-red-500 font-medium'>{user.reviews.length}</span></div>
                    </div>
                    
                    <div className='border-x-2 border-b-2 rounded-b-xl px-5 pb-5'>
                    {selected==="products"?(
                        <>
                            <div>
                                <h1 className='text-xl font-semibold py-5'>{user.username} {products.length > 0 ? <span className='text-gray-300'>({products.length})</span> : <span className='text-red-500'>(Ürün yok)</span>}</h1>
                            </div>

                            <div>
                                <Products filter={filters} user={user} handleLogin={handleLogin}/>
                            </div>
                        </>
                    ):(
                        <>
                        {user.reviews.map((review, i)=>(
                            <div className='flex flex-col gap-5' key={i}>
                                <div className='flex gap-3 my-3 mt-5 border p-5 rounded-xl'>
                                    <img src={review.userId.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full'/>
                                    <div className='flex justify-between w-full'>
                                        <div className='flex flex-col justify-between'>
                                            <span className='font-semibold text-xl'>{review.userId.username}</span>
                                            <div>
                                            {[...Array(5)].map((_, index) => (
                                                <FontAwesomeIcon key={index} icon={review.rating >= index + 1 ? solidStar : regularStar} className='w-min text-orange-500'/>
                                                ))}

                                            <span className='text-lg flex mt-2'>{review.comment}</span>
                                            </div>
                                        </div>
                                        <Link to={`/products/${review.productId._id}`}>
                                            <img src={review.productId.img[0]} alt="" className='min-w-[96px] min-h-[127px] max-w-[96px] max-h-[127px] border rounded-xl'/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
