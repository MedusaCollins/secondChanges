import React, { useState } from 'react';
import axios from 'axios';
import Input from '../templates/Input';

function Popup({ isOpen, onClose, handleLogin }) {
  const [formState, setFormState] = useState({
    login: true,
    errorMessage: '',
    username: '',
    email: '',
    emailorusername:'',
    password: '',
    showPassword: false,
  });

  function handleFormChange(e,type) {
    setFormState((prevState) => ({ ...prevState, [type]: e.target.value }));
  }

  function toggleLogin() {
    setFormState((prevState) => ({
      ...prevState,
      login: !prevState.login,
      errorMessage: '',
      username: '',
      email: '',
      emailorusername:'',
      password: '',
      showPassword: false,
    }));
  }

  function togglePasswordVisibility() {
    setFormState((prevState) => ({ ...prevState, showPassword: !prevState.showPassword }));
  }

  async function handleSubmit(event){
    event.preventDefault();
    if(formState.login){
      try {
        const response = await axios.post(`${process.env.REACT_APP_DB}/login`, {
          emailorusername: formState.emailorusername,
          password: formState.password,
        });
        if (response.data.error) {
          setFormState((prevState) => ({
            ...prevState,
            errorMessage: response.data.error,
          }));
        } else {
          localStorage.setItem('emailorusername', formState.emailorusername);
          localStorage.setItem('password', formState.password);
          handleLogin(true, response.data);
          handleCloseClick();
        }
      } catch (error) {
        console.error('Hata oluştu: ', error);
      }
    }else{
      if(formState.username < 1 || formState.email <1 || formState.password <1){
        setFormState((prevState)=>({
          ...prevState,
          errorMessage: "Username, email and password is not empty."
        }));
      }else{
        try {
          const response = await axios.post(`${process.env.REACT_APP_DB}/createUser`, {
            username: formState.username,
            password: formState.password,
            email: formState.email
          });
          if (response.data.error) {
            setFormState((prevState) => ({
              ...prevState,
              errorMessage: response.data.error,
            }));
          } else {
            handleLogin(true, response.data);
            handleCloseClick();
            localStorage.setItem('emailorusername', formState.username);
            localStorage.setItem('password', formState.password);
          }
        } catch (error) {
          console.error('Hata oluştu: ', error);
        }
      }
    }}


  function handleCloseClick() {
    onClose();
    setFormState((prevState) => ({
      ...prevState,
      login: true,
      errorMessage: '',
      username: '',
      email: '',
      emailorusername:'',
      password: '',
      showPassword: false,
    }));
  }
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseClick}>
      <div className="relative bg-white p-4 rounded-xl shadow-md mx-5" onClick={(e) => e.stopPropagation()}>

        <div className="p-4 text-black text-center sm:w-96">
          <form onSubmit={handleSubmit}>
            <p className='text-2xl text-green-500 font-semibold mb-12'>secondChanges</p>
            <p className='text-2xl text-slate-800 font-bold text-left mb-2'>{formState.login ?'Begin Your Journey':'Sign in to your account'}</p>
            <div className='flex gap-2 text-left'>
              <p className='text-gray-400'>{formState.login ?'Not a member?':'Already a member?'}</p>
              <button type="button" className='text-green-500 hover:text-green-700 font-semibold text-md transition' onClick={() => toggleLogin()}>{formState.login ?'Create an Account':'Log in'}</button>
            </div>

            <div className='flex flex-col sm:gap-4 gap-2 mt-5'>
            {!formState.login?
            (<><Input text="Username" type="text" value={formState.username} onChange={(e)=> handleFormChange(e,"username")} formState={formState} />
            <Input text="Email" type="text" value={formState.email} onChange={(e)=> handleFormChange(e,"email")} formState={formState} /></>):<Input text="Email/Username" type="text" value={formState.emailorusername} onChange={(e)=> handleFormChange(e,"emailorusername")} formState={formState} />}
            <Input text="Password" type={formState.showPassword ? "text" : "password"} value={formState.password} onChange={(e)=> handleFormChange(e,"password")} formState={formState} togglePasswordVisibility={togglePasswordVisibility} />
            <p className='text-red-500 text-right'>{formState.errorMessage}</p>
            <button type="submit" className='bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-2xl transition mt-4'>
              {!formState.login ?'Create an account':'Log in'}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Popup;
