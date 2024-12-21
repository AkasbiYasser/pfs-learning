import styles from "./CategoriesAdmin.module.css";
import { useState, useEffect } from "react";
import axios from 'axios';

//Components
import CategoryTable from "../CategoryTable/CategoryTable";
import CategoryForm from "../CategoryForm/CategoryForm";

function CategoriesAdmin() {
  const [formOpen, setFormOpen] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await axios.get('https://rssplearning.tech/admin/categories');
        setCategories(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categories]);

  const setScroll = (val) => {
    document.body.style.overflow = val ? 'scroll' : 'hidden';
  }

  const addCategory = () => {
    setScroll(false);
    setFormOpen(true);
  }

  const onAdd = () => {
    setScroll(true);
    setFormOpen(false);
  }

  const onCancel = () => {
    setScroll(true);
    setFormOpen(false);
  }

  const onDelete = async (id) => {
    try {
      await axios.delete(`https://rssplearning.tech/admin/categories/${id}`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Categories</h3>
        <button className="btn-v2" onClick={addCategory}>+ Ajouter une catégorie</button>
      </div>
      <div className={styles.body}>
        <CategoryTable data={categories} onDelete={onDelete} />
      </div>

      {formOpen &&
        <CategoryForm ADD={onAdd} CANCEL={onCancel} />
      }
    </div>
  )
}

export default CategoriesAdmin
