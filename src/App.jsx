import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CardUser from './components/CardUser';
import { motion } from "framer-motion"

import Form from './components/Form';

function App() {
   const [users, setUsers] = useState();
   const [updateInfo, setUpdateInfo] = useState()
   const [isFormOpen, setisFormOpen] = useState(false)

   const getAllUsers = () => {
      const URL = `https://users-crud1.herokuapp.com/users/`;
      axios
         .get(URL)
         .then((res) => setUsers(res.data))
         .catch((err) => console.log(err.response.data));
   };

   useEffect(() => {
      getAllUsers();
   }, []);

   const handleOpenForm = () => setisFormOpen(true)

   const handleCloseForm = () => setisFormOpen(false)

  
   return (
      <div className="App">
<div className="header">
            <h1> CRUD</h1>
            <span><i className="fa-solid fa-users"></i> Users: {users?.length}</span>
            <button onClick={handleOpenForm}>Create New User</button>
</div>
       
       <div  className={isFormOpen ? 'form_container' : 'form_none'}>
         <Form getAllUsers={getAllUsers} updateInfo={updateInfo} handleCloseForm={handleCloseForm} />
      </div>
        <div className='App_Card'>
         {users?.map((user) => (
           <CardUser
           setUpdateInfo={setUpdateInfo}
             key={user.id}
             user={user}
             getAllUsers={getAllUsers} 
             handleOpenForm={handleOpenForm}/>
         ))}
        </div>
      </div>
   );
}

export default App;
