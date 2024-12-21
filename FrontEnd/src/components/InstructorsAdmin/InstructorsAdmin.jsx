import styles from "./InstructorsAdmin.module.css";
import { useState, useEffect } from "react";
import axios from 'axios';

//Components
import InstructorTable from "../InstructorTable/InstructorTable";
import InstructorForm from "../InstructorForm/InstructorForm";

function InstructorsAdmin() {
  const [formOpen, setFormOpen] = useState(false);

  const [instructors, setInstructors] = useState([]);

  const [instructorData, setInstructorData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    profession: '',
    image: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await axios.get('https://rssplearning.tech/admin/instructors');
        setInstructors(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [instructors]);

  const setScroll = (val)=>{
    document.body.style.overflow = val ? 'scroll' : 'hidden';
  }

  const addInstructor = ()=>{
    setInstructorData({
      firstName: '',
      lastName: '',
      profession: '',
      image: '',
    });
    setScroll(false);
    setFormOpen(true);
  }

  const onAdd = ()=>{
    setScroll(true);
    setFormOpen(false);
  }

  const onCancel = ()=>{
    setScroll(true);
    setFormOpen(false);
  }

  const onEdit = (item) => {
    setInstructorData(item);
    setScroll(false);
    setFormOpen(true);
  }

  const onDelete = async (id) => {
    try {
      await axios.delete(`https://rssplearning.tech/admin/instructors/${id}`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Instructeurs</h3>
        <button className="btn-v2" onClick={addInstructor}>+ Ajouter un instructeur</button>
      </div>
      <div className={styles.body}>
        <InstructorTable data={instructors} onEdit={onEdit} onDelete={onDelete} />
      </div>

      {formOpen && 
        <InstructorForm data={instructorData} ADD={onAdd} CANCEL={onCancel}/>
      }
    </div>
  )
}

export default InstructorsAdmin
