import React, { useState, useEffect } from 'react';
import styles from './CourseForm.module.css';
import axios from 'axios';

//Utils
import { convertDateFormat } from '../../utils/helpers';

//Images
import Placeholder from '../../assets/images/placeholder.png';

//Components
import RichTextEditor from '../RichTextEditor/RichTextEditor';

function EmptyData(data) {
  return data.title !== '';
}

function CourseForm({ data, ADD, CANCEL }) {
  const [content, setContent] = useState('');

  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [id, setId] = useState('');
  const [courseData, setCourseData] = useState({
    title: '',
    price: '',
    categoryName: '',
    rating: '',
    description: '',
    mainImagePath: '',
    url: '',
    startDate: '',
    endDate: '',
    instructorName: '',
    videoUrl: '',
    quizUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post('http://localhost:8080/admin/courses', courseData);
    } catch (error) {
      console.error('Error adding data:', error);
    }

    ADD();
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      axios.put(`http://localhost:8080/admin/courses/${id}`, courseData);
    } catch (error) {
      console.error('Error editing data:', error);
    }

    ADD();
  };

  useEffect(() => {
    setId(data.id);
    setCourseData(data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await axios.get('http://localhost:8080/admin/categories');
        setCategories(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await axios.get('http://localhost:8080/admin/instructors');
        setInstructors(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [instructors]);



  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Cours</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formLeft}>
            {/* <input type="file" name="image" value={courseData.image} onChange={handleInputChange} /> */}
            <img className={styles.imageHolder} src={courseData.mainImagePath ? courseData.mainImagePath : Placeholder} alt='image placeholder' />
            <label>
              Description:
            </label>
            {/* <textarea name="description" placeholder='Description...' value={courseData.description} onChange={handleInputChange} /> */}
            
            <RichTextEditor content={content} />


          </div>
          <div className={styles.formRight}>
            <input type="text" name="title" placeholder='Titre' value={courseData.title} onChange={handleInputChange} />
            <input type="text" name="mainImagePath" placeholder='Image Url' value={courseData.mainImagePath} onChange={handleInputChange} />
            <input type="text" name="price" placeholder='Prix' value={courseData.price} onChange={handleInputChange} />
            <input type="number" name="rating" min="1" max="5" placeholder='Evaluation (1-5)' value={courseData.rating} onChange={handleInputChange} />
            <label>
              Catégorie:<br />
              <select name="categoryName" value={courseData.categoryName} onChange={handleInputChange}>
                {categories.map((item) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
            </label>
            <label>
              Date de début - Date de fin:<br />
              <div className={styles.dateContainer}>
                <input type="date" name="startDate" value={convertDateFormat(courseData.startDate)} onChange={handleInputChange} />
                <p>-</p>
                <input type="date" name="endDate" value={convertDateFormat(courseData.endDate)} onChange={handleInputChange} />
              </div>
            </label>

            <label>
              Instructeur:<br />
              <select name="instructorName" value={courseData.instructorName} onChange={handleInputChange}>
                {instructors.map((item) => (
                  <option key={item.id} value={`${item.firstName} ${item.lastName}`}>{`${item.firstName} ${item.lastName}`}</option>
                ))}
              </select>
            </label>
            <input type="text" name="urlVideo" placeholder='Video URL' value={courseData.videoUrl} onChange={handleInputChange} />
            <input type="text" name="quizUrl" placeholder='Quiz URL' value={courseData.quizUrl} onChange={handleInputChange} />
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
        </form>
      </div>
    </div>
  )
}

export default CourseForm
