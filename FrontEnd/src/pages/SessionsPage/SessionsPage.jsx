import styles from "./SessionsPage.module.css";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

//components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SessionCard from '../../components/SessionCard/SessionCard';
import PopUp from "../../components/PopUp/PopUp";

//utils
import { checkDateRange } from "../../utils/helpers";

function SessionsPage() {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);
  const [courses, setCourses] = useState([]);

  const closePopup = () => {
    setPopup(false);
  }

  const open = (course) => {
    if (checkDateRange(course.startDate, course.endDate) == 1) {
      navigate(`/session/${course.id}`);
      return;
    }
    
    setPopup(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await axios.get('http://localhost:8080/admin/courses');
        setCourses(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courses]);

  const sortedCourses = () => {
    //sort by ongoing first, soon second and ended last
    return courses.sort((a, b) => checkDateRange(a.startDate, a.endDate) - checkDateRange(b.startDate, b.endDate));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.sessions}>
          {sortedCourses().map((course) => (
            <SessionCard key={course.id} course={course} pressed={()=>open(course)} />
          ))}
        </div>

        {popup &&
          <PopUp title="Alerte"
            description="Le cours n’est pas valable pour l’instant. Veuillez patienter jusqu’à la date du cours."
            OK={closePopup} />
        }

      </div>
      <Footer />
    </>
  )
}

export default SessionsPage