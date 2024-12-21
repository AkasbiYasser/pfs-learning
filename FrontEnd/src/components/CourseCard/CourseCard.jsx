import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";

//utils
import { ratingStars, formatDate } from "../../utils/helpers";

//images
import placeholder from "../../assets/images/placeholder.png";
import { useEffect, useState } from "react";

function CourseCard({ course, subscribe, register }) {
  const navigate = useNavigate();

  const {id, title, mainImagePath, price, categoryName, description, startDate, endDate, rating, url} = course;

  const open = () => {
    navigate(`/courses/${categoryName}/${id}`);
  }

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseDetails}>
        <div>
          <h3 className={styles.courseTitle}>{title}</h3>
          <p className={styles.courseCategory}>{categoryName}</p>
        </div>
        <img
          src={mainImagePath ? mainImagePath : placeholder}
          alt="Course Thumbnail"
          className={styles.courseImage}
          onClick={() => open(url)}
        />
        <div className={styles.courseRating}>
          {ratingStars(rating)}
        </div>
        <p><i>{formatDate(startDate)}</i> à <i>{formatDate(endDate)}</i></p>
        <div className={styles.buttonsContainer}>
          {register && 
          <button className={`${styles.registerButton} ${subscribe ? "btn-info" : ""}`} onClick={() => register(url)} style={{cursor: subscribe ? 'not-allowed' : 'pointer'}} disabled={subscribe}>{subscribe ? "Vous êtes inscrit à ce cours" : "S'inscrire à ce cours"}</button>
          }
          <button className={styles.detailButton} onClick={() => open(url)}>Détails</button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
