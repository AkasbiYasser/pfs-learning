import styles from "./CoursesPage.module.css";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

//utils
import {refreshPage} from '../../utils/web';

//components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseCard from '../../components/CourseCard/CourseCard';
import PopUp from "../../components/PopUp/PopUp";

function CoursesPage() {
  const params = useParams();
  const [pop, setPop] = useState(false);

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const filteredCourses = courses.filter((course) => {
    const nameMatches = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatches = selectedCategory === 'All' || course.categoryName === selectedCategory;
    const priceMatches = (course.price >= minPrice && course.price <= maxPrice);
    return nameMatches && categoryMatches && priceMatches;
  });

  const setScroll = (val) => {
    document.body.style.overflow = val ? 'scroll' : 'hidden';
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

  const enroll = async (course) => {
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
      refreshPage();
    } catch (error) {
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

  const isSubscribed = (course) => {
    return userCourses.some(obj => {
      return Object.keys(course).every(key => obj[key] === course[key]);
    });
  }

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category);
    }
  }, []);

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const val = await axios.get('https://rssplearning.tech/admin/courses');
        setCourses(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUserCourses = async () => {
      try {
        const user = GetCookie("user");
        console.log(user);
        const val = await axios.get(`https://rssplearning.tech/user/${user.id}/courses`);
        setUserCourses(val.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourses();
    fetchUserCourses();
  }, [courses, userCourses]);

  return (
    <>
      <Header />
      <div className={styles.coursesContainer}>
        <div className={styles.filters}>
          <label className={styles.subtitle}>RECHERCHEZ</label>
          <input
            type="search"
            placeholder="Search by course title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ul className={styles.categoryList}>
            <label className={styles.subtitle}>CATÉGORIE</label>
            <li className={styles.listItem} onClick={() => setSelectedCategory("All")}><i>All Categories</i></li>
            {categories.map((category) => (
              <li className={styles.listItem} key={category.id} onClick={() => setSelectedCategory(category.name)}>
                {category.name}
              </li>
            ))}
          </ul>

          <label className={styles.subtitle}>PRIX (DHS)</label>
          <div className={styles.priceContainer}>
            <input
              type="number"
              placeholder="Max Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value == '' ? 0 : e.target.value)}
            />
            <p> - </p>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value == '' ? 10000 : e.target.value)}
            />
          </div>
        </div>
        <div className={styles.courses}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} subscribe={isSubscribed(course)} register={() => enroll(course)} />
          ))}
        </div>
        {pop &&
          <PopUp title="S'inscrire à ce cours"
            description="Êtes-vous sûr de vouloir vous inscrire à ce cours ?"
            OK={popUpOK}
            CANCEL={popUpCancel} />
        }
      </div>
      <Footer />
    </>
  )
}

export default CoursesPage