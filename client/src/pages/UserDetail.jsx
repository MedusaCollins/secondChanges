import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Products from '../components/Home/Products';
import Input from '../components/templates/Input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';

const UserDetail = ({ handleLogin, pUser }) => {
    const { userName } = useParams();
    const [rating, setRating] = useState();
    const [filteringData, setFilteringData] = useState({
        popUp: 0,
        filters: null,
        isLoading: 1,
        products: [],
        selected: "products",
        showPassword: 0

    })
    const [formData, setFormData] = useState({
        filePath: null,
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        errorMessage: '',
        user: null
    })

    function togglePasswordVisibility() {
        setFilteringData((prevState) => ({ ...prevState, showPassword: !prevState.showPassword }));
      }

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_DB}/profiles/${userName}`);
                if (userResponse.status === 200) {
                    console.log(userResponse.data)
                    setFormData((prevState)=>({
                        ...prevState,
                        user: userResponse.data,
                        username: userResponse.data.username,
                        email: userResponse.data.email}))

                    setFilteringData((prevState)=>({
                        ...prevState,
                        filters: {seller: userResponse.data._id}
                    }))

                    // Ürünleri filtrele ve güncelle
                    const ratings = userResponse.data.reviews.map(review => review.rating);
                    if (ratings.length > 0) {
                        const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
                        const averageRating = totalRating / ratings.length;
                        setRating(averageRating.toFixed(1));
                    } else {
                        console.log('Henüz hiç rating yok.');
                    }

                    setFilteringData((prevState)=>({
                        ...prevState,
                        isLoading: false
                    }))
                } else {
                    setFilteringData((prevState)=>({
                        ...prevState,
                        isLoading: false
                    }))
                }
            } catch (error) {
                console.error(error);

                    setFilteringData((prevState)=>({
                        ...prevState,
                        isLoading: false
                    }))
            }
        }

        fetchData();
    }, [userName]);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DB}/api/products`, filteringData.filters)
            .then((response) => {
                setFilteringData((prevState)=>({
                    ...prevState,
                    products: response.data
                }))
            })
            .catch((error) => console.error(error));
    }, [filteringData.filters]);


    async function handleFileChange(e){
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
            const uploadResponse = await axios.post(`${process.env.REACT_APP_DB}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFormData((prevState)=> ({
              ...prevState,
              filePath: process.env.REACT_APP_DB + uploadResponse.data.filePath}))
        } catch (error) {
            console.error(error);
        }
      };
  
      async function applyChanges(e){
          try {
              e.preventDefault();
              const applyChanges = await axios.post(`${process.env.REACT_APP_DB}/saveUserData`, formData)
              if(applyChanges.data.error){
                setFormData((prevState)=>({...prevState, errorMessage: applyChanges.data.error}))
              }
                if(!applyChanges.data.error){
                    if(applyChanges.data.email){
                        localStorage.setItem('email', formData.email);
                    }
                    if(applyChanges.data.newPassword){
                        localStorage.setItem('password', formData.newPassword);
                    }
                    if(!applyChanges.data.error){
                        window.location.href = formData.username;
                    }
                }
          } catch (error) {
            setFormData((prevState)=>({...prevState, errorMessage: error}))
          }
      }

      function handleFormChange(e,type) {
        setFormData((prevState) => ({ ...prevState, [type]: e.target.value }));
      }

    if (filteringData.isLoading || !formData.user) {
        return (
            <div>Böyle bir kullanıcı bulunamadı.</div>
        );
    }
    return (
        <div>
            <div className='p-5 mx-24 grid grid-cols-5'>
                <div className='row-span-1 col-span-1 text-center text-blue-400 sticky border-2 top-16 mx-5 p-5 h-min rounded-xl'>
                    <img src={formData.user.img} alt="Seller" className='rounded-full w-52 h-52 mx-auto border-2 sticky mb-5' />
                    <span className='text-2xl font-normal'>{formData.user.username}</span>
                    {formData.user.username === pUser.username && (
                        <div onClick={() => setFilteringData((prevState)=>({...prevState,popUp: 1}))} className='text-white bg-blue-400 hover:bg-blue-500 p-2 my-5 rounded-lg hover:cursor-pointer'>
                            Edit Profile
                        </div>
                    )}
                    <div className='p-2 text-center text-black'>
                        {rating > 0 ? (
                            <>
                                <FontAwesomeIcon icon={solidStar} className='text-orange-500 text-left' /> {rating}<span className='text-gray-500'>/5 ({formData.user.reviews.length} reviews)</span>
                            </>
                        ) : <span className='text-gray-500'>{formData.user.reviews.length} reviews</span>}
                    </div>
                </div>

                <div className='row-span-1 col-span-4 justify-center'>
                    <div className='flex flex-row justify-around'>
                        <div className={`${formData.user.reviews.length > 0 ? "rounded-tl-xl" : "rounded-t-xl"} w-full text-center p-5 text-xl border-t-2 ${formData.user.reviews.length > 0 ? "border-l-2" : "border-x-2"} hover:cursor-pointer`} onClick={() => setFilteringData((prevState)=>({...prevState,selected: "products"}))} style={filteringData.selected === "reviews" ? { backgroundColor: '#E5E7EB' } : null}><FontAwesomeIcon icon={faShop} className='' /> Products</div>
                        {formData.user.reviews.length > 0 &&
                            <div className='rounded-tr-xl w-full text-center p-5 text-xl border-t-2 border-r-2 hover:cursor-pointer' onClick={() => setFilteringData((prevState)=>({...prevState,selected: "reviews"}))} style={filteringData.selected === "products" ? { backgroundColor: '#E5E7EB' } : null}><FontAwesomeIcon icon={faComments} /> Reviews <span className='text-red-500 font-medium'>{formData.user.reviews.length}</span></div>}
                    </div>

                    <div className='border-x-2 border-b-2 rounded-b-xl px-5 pb-5'>
                        {filteringData.selected === "products" ? (
                            <>
                                {filteringData.products.length > 0 ? (
                                    <>
                                        <div>
                                            <h1 className='text-xl font-semibold py-5'>{formData.user.username} <span className='text-gray-300'>({filteringData.products.length})</span></h1>
                                        </div>
                                        <div>
                                            <Products filter={filteringData.filters} user={formData.user} handleLogin={handleLogin} />
                                        </div>
                                    </>
                                ) : (
                                    <div className='justify-center items-center flex h-[15.8rem]'>
                                        <span className='text-2xl'>This user not have a product.</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {formData.user.reviews.map((review, i) => (
                                    <div className='flex flex-col gap-5' key={i}>
                                        <div className='flex gap-3 my-3 mt-5 border p-5 rounded-xl'>
                                            <img src={review.userId.img} alt="comment user profile pic" className='w-12 h-12 mt-2 rounded-full' />
                                            <div className='flex justify-between w-full'>
                                                <div className='flex flex-col gap-2'>
                                                    <span className='font-semibold text-xl'>{review.userId.username}</span>
                                                    <div>
                                                        {[...Array(5)].map((_, index) => (
                                                            <FontAwesomeIcon key={index} icon={review.rating >= index + 1 ? solidStar : regularStar} className='w-min text-orange-500 mt-0' />
                                                        ))}

                                                        <span className='text-lg flex mt-2'>{review.comment}</span>
                                                    </div>
                                                </div>
                                                <Link to={`/products/${review.productId._id}`}>
                                                    <img src={review.productId.img[0]} alt="" className='min-w-[96px] min-h-[127px] max-w-[96px] max-h-[127px] border rounded-xl' />
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

            {filteringData.popUp? (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
                    <div className='fixed inset-0 bg-black opacity-50' onClick={() => setFilteringData((prevState)=>({...prevState,popUp: 0}))}></div>
                        <div className="relative bg-white w-96 rounded-lg p-4">
                            <form onSubmit={applyChanges}>
                                <div className="my-2 flex items-center justify-between">
                                    {formData.filePath===null?(
                                        <img src={formData.user.img} alt='preview' className='h-16 w-16 text-gray-300 rounded-full border-2'/>
                                        ):(
                                            <img src={formData.filePath} alt='preview' className='h-16 w-16 text-gray-300 rounded-full border-2'/>
                                            )}
                                    <input type="file" id="fileInput" accept="image/*" className='hidden' onChange={handleFileChange} />
                                    <label htmlFor="fileInput">
                                        <button type="button" onClick={() => document.getElementById('fileInput').click()} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                    </label>
                                </div>


                                <div className='flex flex-col gap-2 mt-5'>
                                    <Input text="Username" type="text" value={formData.username} onChange={(e)=> handleFormChange(e,"username")} formState={formData} />
                                    <Input text="Email" type="text" value={formData.email} onChange={(e)=> handleFormChange(e,"email")} formState={formData} />

                                    <div className='mt-5 gap-2 text-center font-semibold flex flex-col'>
                                        <span>Change Password</span>
                                        <div className='flex flex-col gap-2'>
                                            {/* <Input text="Old Password" type="password" value={formData.oldPassword} onChange={(e)=> handleFormChange(e,"oldPassword")} formState={formData} /> */}
                                            <Input text="Old Password" type={filteringData.showPassword ? "text" : "password"} value={formData.oldPassword} onChange={(e)=> handleFormChange(e,"oldPassword")}  formState={filteringData} togglePasswordVisibility={togglePasswordVisibility} />
                                            <Input text="New Password" type={filteringData.showPassword ? "text" : "password"} value={formData.newPassword} onChange={(e)=> handleFormChange(e,"newPassword")}  formState={filteringData} />
                                        </div>
                                    </div>
                                </div>
                                <p className='text-red-500 text-right text-lg mt-5 '>{formData.errorMessage}</p>
                            <button type='submit' className='text-white bg-blue-500 hover:bg-blue-600 p-2 mt-5  w-full rounded-lg hover:cursor-pointer'>Save Changes</button>
                            </form>
                        </div>
                </div>
            ):null}
        </div>
    );
}

export default UserDetail;