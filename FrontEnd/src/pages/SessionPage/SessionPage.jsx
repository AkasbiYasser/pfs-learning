import styles from "./SessionPage.module.css";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';

//utils
import {refreshPage} from '../../utils/web';

//components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

//images
import placeholder from "../../assets/images/placeholder.png";
import noContent from "../../assets/images/no-content.png";

function SessionPage() {
  const params = useParams();
  const [isLive, setIsLive] = useState(true);
  const [id, setId] = useState('');

  const [course, setCourse] = useState({});

  const setScroll = (val) => {
    document.body.style.overflow = val ? 'scroll' : 'hidden';
  }

  const enroll = () => {
    setScroll(false);
    setPop(true);
  }

  const popUpOK = () => {
    setScroll(true);
    setPop(false);
  }

  const popUpCancel = () => {
    setScroll(true);
    setPop(false);
  }

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }

    const fetchData = async () => {
      try {
        const val = await axios.get(`https://rssplearning.tech/admin/courses/${params.id}`);
        setCourse(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [course]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.navPath}>
            <a href="/sessions">Sessions</a> / <b>{course.id}</b>
          </div>
          <div className={styles.courseContainer}>
            <h1>{course.title}</h1>
            <p>{course.categoryName}</p>

            {course.url &&
              <div className={styles.courseDirectContainer}>
                <img
                  className={styles.courseImage}
                  src={course.mainImagePath ? course.mainImagePath : placeholder}
                  alt="Course Thumbnail"
                />
                <div className={styles.courseButtons}>
                  <h3>Cours en direct</h3>
                  <p>Rejoignez le cours en cliquant sur le bouton ci-dessous. ⤵️</p>
                  <a href={course.url} target="_blank">
                    <button className={styles.button}>Rejoignez le cours</button>
                  </a>
                </div>
              </div>
            }
            {course.videoUrl &&
              <div className={styles.courseVideo}>
                <h3>Cours video</h3>
                <ReactPlayer
                  url={course.videoUrl}
                  width="100%"
                  height="100%"
                  controls />
              </div>
            }

            {(!course.url && !course.videoUrl) ?
              <div className={styles.fallbackMessage}>
                <img src={noContent} alt="no content sticker" />
                <p>Aucune réunion en direct ou vidéo n’est disponible pour l’instant, <span onClick={refreshPage}>veuillez réessayer plus tard.</span></p>
              </div>

              :
              <>
                <h3>À propos de ce cours</h3>
                <div className={`tiptap ${styles.descriptionContainer}`} dangerouslySetInnerHTML={{ __html: course.description }}></div>
              </>
            }

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SessionPage