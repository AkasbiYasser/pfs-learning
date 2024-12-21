import styles from "./Course.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

//Components
import CourseCard from "../CourseCard/CourseCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

function Course() {
  const [courses, setCourses] = useState([]);

  const getNearCourses = ()=>{
    const sortedCourses = courses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    return sortedCourses.slice(0, 3);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await axios.get('https://rssplearning.tech/admin/courses');
        setCourses(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courses]);

  return (
    <div id="courses" className={styles.container}>
      <div className={styles.title}>
        <h2>Cours les plus proches</h2>
        <p>“Un apprentissage fluide pour tous, où que vous soyez” 🌐</p>
      </div>

      <Carousel responsive={responsive}>
        {getNearCourses().map((course) => (
          <div key={course.id} className={styles.courseCardWrapper}>
              <CourseCard course={course} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Course
