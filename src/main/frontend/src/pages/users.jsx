import { useEffect } from 'react'

const Users = () => {

  useEffect(() => {
    document.title = 'Users | Bug Tracker'; 
  }, []);

  return (
    <div>Users</div>
  )
}

export default Users