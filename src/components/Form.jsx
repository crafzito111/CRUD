import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';


const defaultValue = {
   last_name: '',
   first_name: '',
   email: '',
   password: '',
   birthday: '',
};


const Form = ({ getAllUsers, updateInfo, handleCloseForm, setUpdateInfo }) => {

    useEffect(() => {
        if (updateInfo) {
            reset(updateInfo);
        }
    }, [updateInfo]);
 
   const { register, reset, handleSubmit } = useForm();

   const CreateUser = data => {
      const URL = `https://users-crud1.herokuapp.com/users/`;
      axios
         .post(URL, data)
         .then((res) => {
          
            getAllUsers();
         })
         .catch((err) => console.log(err.response.data));
    
   };

   const updateUser = data => {
       const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
       axios.patch(URL, data)
       .then(res => {
     
        getAllUsers()
       })
       .catch(err => console.log(err))
   }

   const submit = (data) => {
if(updateInfo){
// Update user
updateUser(data)
   setUpdateInfo()
} else {
    // Create User
    CreateUser(data);
   }
   reset(defaultValue)
handleCloseForm()
}

   return (
       <div className='form' >

         <form onSubmit={handleSubmit(submit)} className='form_style input-group' >
               <h2>{updateInfo ? 'Update User Informatión' : 'Create New User'}</h2>

            <div className="form__group">
               <input className="form__field w-100" {...register('first_name')} placeholder="First Name" type="text" id="first_name" />
               <label className="form__label"  htmlFor="first_name" >First Name:</label>
            </div>

            <div className="form__group">
               <input className="form__field w-100" {...register('last_name')} placeholder='Last Name' type="text" id="last_name" />
               <label className="form__label" htmlFor="last_name">Last Name:</label>
            </div>

            <div className="form__group">
               <input className="form__field w-100" {...register('email')} type="email" placeholder='Email'  id="email" />
               <label className="form__label" htmlFor="email">Email:</label>
            </div>

            <div className="form__group">
               <input className="form__field " {...register('password')} type="password" placeholder='Password' id="password" />
               <label className="form__label" htmlFor="password">Password:</label>
            </div>

            <div className="form__group">
               <input className="form__field w-100" {...register('birthday')} type="date" placeholder='Birthday' id="birthday" />
               <label className="form__label" htmlFor="birthday">Birthday:</label>
            </div>
            <div className="btns btnsMediaQuery">
               <button>{updateInfo ? 'Update' : 'Create'}</button>
               <button onClick={handleCloseForm}>Cancel</button>
           </div>
         </form>
      
      </div>
   );
};

export default Form;
