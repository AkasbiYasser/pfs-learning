import React, { useState, useEffect } from 'react';
import styles from './InstructorForm.module.css';
import axios from 'axios';

function EmptyData(data)
{
  return data.firstName !== '';
}

function InstructorForm({ data, ADD, CANCEL }) {
  const [id, setId] = useState('');
  const [instructorData, setInstructorData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstructorData({ ...instructorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post('https://rssplearning.tech/admin/instructors', instructorData);
    } catch (error) {
      console.error('Error adding data:', error);
    }

    ADD();
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      axios.put(`https://rssplearning.tech/admin/instructors/${id}`, instructorData);
    } catch (error) {
      console.error('Error editing data:', error);
    }

    ADD();
  };

  useEffect(()=>{
    setId(data.id);
    setInstructorData(data);
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Instructeur</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder='Prenom' value={instructorData.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder='Nom' value={instructorData.lastName} onChange={handleInputChange} />
          <input type="text" name="profession" placeholder='Profession' value={instructorData.profession} onChange={handleInputChange} />
          <label>
            Image:<br />
            <input type="file" name="image" value={instructorData.image} onChange={handleInputChange} />
          </label>
        </form>
        <div className={styles.cardButtons}>
          {
            EmptyData(data) ? 
            <button type="submit" className={styles.cardOK} onClick={handleEdit}>Modifier</button>
            :
            <button type="submit" className={styles.cardOK} onClick={handleSubmit}>Ajouter</button>
          }
          {CANCEL &&
            <button className={styles.cardCancel} onClick={CANCEL}>Annuler</button>}
        </div>
      </div>
    </div>
  )
}

export default InstructorForm
