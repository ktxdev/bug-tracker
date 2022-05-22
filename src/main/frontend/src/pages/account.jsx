import { useEffect } from 'react'

const Account = () => {
  
  useEffect(() => {
    document.title = 'Account | Bug Tracker'; 
  }, []);

  return (
    <div>Account</div>
  )
}

export default Account