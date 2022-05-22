import { useEffect } from "react";


const Projects = () => {

  useEffect(() => {
    document.title = 'Projects | Bug Tracker'; 
  }, []);

  return (
    <div>Projects</div>
  )
}

export default Projects