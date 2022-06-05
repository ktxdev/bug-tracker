import { useEffect } from 'react'

const Tickets = () => {

  useEffect(() => {
    document.title = 'Tickets | Bug Tracker'; 
  }, []);

  return (
    <div>Tickets</div>
  )
}

export default Tickets