import React, { useState } from 'react';
import axios from 'axios';
import Input from '../templates/Input';

function Popup({ isOpen, onClose, handleLogin }) {
  const [formState, setFormState] = useState({
    login: true,
    errorMessage: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

  function handleUsernameChange(e) {
    setFormState((prevState) => ({ ...prevState, username: e.target.value }));
  }
  function handleEmailChange(e) {
    setFormState((prevState) => ({ ...prevState, email: e.target.value }));
  }
  function handlePasswordChange(e) {
    setFormState((prevState) => ({ ...prevState, password: e.target.value }));
  }

  function toggleLogin() {
    setFormState((prevState) => ({
      ...prevState,
      login: !prevState.login,
      errorMessage: '',
      username: '',
      email: '',
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
          email: formState.email,
          password: formState.password,
        });
        if (response.data.error) {
          setFormState((prevState) => ({
            ...prevState,
            errorMessage: response.data.error,
          }));
        } else {
          localStorage.setItem('email', formState.email);
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
            localStorage.setItem('email', formState.email);
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
      password: '',
      showPassword: false,
    }));
  }
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50" onClick={handleCloseClick}>
      <div className="relative bg-white p-4 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>

        <div className="p-4 text-black text-center w-96">
          <form onSubmit={handleSubmit}>
            <p className='text-2xl text-green-500 font-semibold mb-12'>secondChanges</p>
            <p className='text-2xl text-slate-800 font-bold text-left mb-2'>{formState.login ?'Begin Your Journey':'Sign in to your account'}</p>
            <div className='flex gap-2 text-left'>
              <p className='text-gray-400'>{formState.login ?'Not a member?':'Already a member?'}</p>
              <button type="button" className='text-green-500 hover:text-green-700 font-semibold text-md transition' onClick={() => toggleLogin()}>{formState.login ?'Create an Account':'Log in'}</button>
            </div>

            <div className='flex flex-col gap-4 mt-5'>
            {!formState.login&&<Input text="Username" type="text" value={formState.username} onChange={handleUsernameChange} formState={formState} />}
            <Input text="Email" type="text" value={formState.email} onChange={handleEmailChange} formState={formState} />
            <Input text="Password" type={formState.showPassword ? "text" : "password"} value={formState.password} onChange={handlePasswordChange} formState={formState} togglePasswordVisibility={togglePasswordVisibility} />
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
