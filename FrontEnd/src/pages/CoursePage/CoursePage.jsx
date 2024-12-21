import styles from "./CoursePage.module.css";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Cookies from "js-cookie";
import axios from 'axios';

//components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PopUp from "../../components/PopUp/PopUp";

//utils
import { ratingStars, formatDate } from "../../utils/helpers";

//images
import placeholder from "../../assets/images/placeholder.png";
import profileHolder from "../../assets/images/profile.png";

function CoursePage() {
  const params = useParams();
  const [pop, setPop] = useState(false);
  const [id, setId] = useState('');

  const [course, setCourse] = useState({});
  const [userCourses, setUserCourses] = useState([]);

  const setScroll = (val) => {
    document.body.style.overflow = val ? 'scroll' : 'hidden';
  }

  const enroll = async () => {
    const user = GetCookie("user");
    
    try {
      await axios.post(`https://rssplearning.tech/user/${user.id}/courses/${course.id}`);
    } catch (error) {
      console.error('Error adding course to user:', error);
    }

    try {
      const response = await axios.post('https://rssplearning.tech/user/login', {
        email: user.email,
        password: user.password
      });

      const userData = response.data;
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    } catch (error) {
      alert("Erreur");
      console.error('Error fetching data:', error.response || error.message);
    }

    // setScroll(false);
    // setPop(true);
  }

  const popUpOK = () => {
    setScroll(true);
    setPop(false);
  }

  const popUpCancel = () => {
    setScroll(true);
    setPop(false);
  }

  const isSubscribed = () => {
    return userCourses.some(obj => {
      return Object.keys(course).every(key => obj[key] === course[key]);
    });
  }

  const GetCookie = (key) => {
    const cookieValue = Cookies.get(key);

    try {
      const jsonValue = JSON.parse(cookieValue);
      return jsonValue;
    } catch (e) {
      console.error("Cookie value is not valid JSON", e);
      return undefined;
    }
  };

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }

    const fetchCourse = async () => {
      try {
        const val = await axios.get(`https://rssplearning.tech/admin/courses/${params.id}`);
        setCourse(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourse();
  }, [course]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const user = GetCookie("user");
        const val = await axios.get(`https://rssplearning.tech/user/${user.id}/courses`);
        setUserCourses(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserCourses();
  }, [userCourses]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.navPath}>
            <a href="/courses">Courses</a> / <a href={`/courses/${course.categoryName}`}>{course.categoryName}</a> / <b>{course.title}</b>
          </div>
          <div className={styles.courseContainer}>
            <h1>{course.title}</h1>
            <p>{course.categoryName}</p>
            <img
              className={styles.courseImage}
              src={course.mainImagePath ? course.mainImagePath : placeholder}
              alt="Course Thumbnail"
            />
            <h3>À propos de ce cours</h3>

            <div className={`tiptap ${styles.descriptionContainer}`} dangerouslySetInnerHTML={{ __html: course.description }}></div>

          </div>
          {/* {course.videoUrl &&
            <div className={styles.courseVideo}>
              <h3>Enregistrement vidéo du cours</h3>
              <ReactPlayer
                url={course.videoUrl}
                width="100%"
                height="100%"
                controls />
            </div>
          } */}
        </div>
        <div className={styles.side}>
          {/* Course Info */}
          <div className={styles.enrollCard}>
            <h4>Informations sur le cours</h4>
            <div className={styles.courseRating}>
              {ratingStars(course.rating)}
            </div>
            <p><i>{formatDate(course.startDate)}</i> à <i>{formatDate(course.endDate)}</i></p>
            <button className={`${styles.courseButton} ${isSubscribed() ? "btn-info" : ""}`} onClick={() => enroll()} style={{ cursor: isSubscribed() ? 'not-allowed' : 'pointer' }} disabled={isSubscribed()}>{isSubscribed() ? "Vous êtes inscrit à ce cours" : "S'inscrire à ce cours"}</button>
            {pop &&
              <PopUp title="S'inscrire à ce cours"
                description="Êtes-vous sûr de vouloir vous inscrire à ce cours ?"
                OK={popUpOK}
                CANCEL={popUpCancel} />
            }
          </div>

          {/* Instructor */}
          <div className={styles.intructorCard}>
            <h4>À propos de l’instructeur</h4>
            <div className={styles.intructorInfo}>
              <div className={styles.intructorImageContainer}>
                <img className={styles.intructorImage}
                  // src={course.instructor.image ? course.instructor.image : profileHolder}
                  src={profileHolder}
                  alt="instructor profile" />
              </div>
              <div>
                <p className={styles.intructorName}>{course.instructorName}</p>
                <p className={styles.intructorTagline}>Instructor departement</p>
              </div>
            </div>
            <p>description about the instructor</p>
          </div>

          {/* Quiz */}
          <div className={styles.quizCard}>
            <h4>Final Quiz</h4>
            <p>Passez cet Quiz pour prouver que vous avez obtenu des informations essentielles de ce cours.</p>
            <a href={course.quizUrl} target="_blank">
              <button className={styles.courseButton}>Lancer le quiz</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CoursePage
