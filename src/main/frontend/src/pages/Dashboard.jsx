import { useEffect } from 'react'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard | Bug Tracker'; 
  }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard