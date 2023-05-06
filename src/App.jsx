import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [users,setUsers] = useState([]);

useEffect(() => {
  fetch(`http://localhost:5000/users`)
  .then(response => response.json())
  .then(apiData => setUsers(apiData))
  .catch(error => {
    console.log(error.message)
  })
},[])

const handleAddUser = (event) => {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  // console.log(name, email)
  const user = {name, email}
  // console.log(user)
  fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .then(apiData => {
    console.log('inside post response' , apiData)
    const newUsers = [...users,apiData];
    setUsers(newUsers)
    form.reset();
  })
  .catch(error => {
    console.log(error.message)
  })
}
  return (
    <>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <h1>Users Management System</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
