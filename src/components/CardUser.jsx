import axios from 'axios'
import React from 'react'

const CardUser = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {
    
const deleteUser = data => {
  const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;
  axios.delete(URL, data)
    .then(res => {
      getAllUsers()
    })
  .catch(err => console.log(err))
}

const handleUpdate = () => {
  setUpdateInfo(user)

}

  return (
    <div className='card_container'>
    <div className='card__datos'>
        <h2 className='card__title'>{user.first_name} {user.last_name}</h2>

        <ul>
          <li>Email <br /> <span><i className="fa-solid fa-envelope"></i> {user.email}</span></li>
          <li> Birthday <br /> <span><i className="fa-solid fa-cake-candles"></i> {user.birthday}</span></li>
        </ul>
    </div>
    <div className="btns">
        <button onClick={deleteUser}><i className="fa-solid fa-trash"></i> </button>
        <button onClick={() => { handleUpdate(); handleOpenForm(); }}><i className="fa-solid fa-pen-to-square"></i></button>
    </div>
    </div>
  )
}

export default CardUser