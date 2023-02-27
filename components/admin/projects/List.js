import ListItem from "./ListItem";
import styles from './styles.module.scss'

export default function List({projects,setProjects}){
  return (
    <ul className={styles.list}>
{
    projects.map((project)=>{
     <ListItem 
     project={project}
     key={project._id}
     setProjects={setProjects}/>   
    })
}
    </ul>
  )  
}


