import React, { useState } from 'react';
import styles from './CategoryForm.module.css';
import axios from 'axios';

function CategoryForm({ ADD, CANCEL }) {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = {
      name: category,
    };

    try {
      const val = await axios.post('https://rssplearning.tech/admin/categories', categoryData);
    } catch (error) {
      console.error('Error adding data:', error);
    }

    ADD();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Catégorie</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="category" placeholder='Catégorie' value={category} onChange={(e) => setCategory(e.target.value)} />
        </form>
        <div className={styles.cardButtons}>
          <button type="submit" className={styles.cardOK} onClick={handleSubmit}>Ajouter</button>
          {CANCEL &&
            <button className={styles.cardCancel} onClick={CANCEL}>Annuler</button>}
        </div>
      </div>
    </div>
  )
}

export default CategoryForm
