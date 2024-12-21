import styles from "./Header.module.css";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

//components
import CustomLink from "../CustomLink/CustomLink";

//images
import Logo from "../../assets/images/graduation-hat.png";

function Header() {
  const [user, setUser] = useState();
  const [isPanelVisible, setPanelVisible] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
  }

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

  const coursToggle = (e) => {
    e.preventDefault();
    setPanelVisible(!isPanelVisible);
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

  useEffect(()=>{
    setUser(GetCookie("user"));
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">
            <img src={Logo} alt="ZLearning logo" />
            ZLearning
          </a>
        </div>

        <div className={styles.list}>
          <ul>
            <li><CustomLink href="/#home">Accueil</CustomLink></li>
            <li onClick={coursToggle}> <CustomLink href="">Cours</CustomLink></li>
            {
              (user && user.courseList.length !== 0) &&
              <li><CustomLink href="/sessions">Sessions</CustomLink></li>
            }
            <li><CustomLink href="/#about">À propos</CustomLink></li>
            <li><CustomLink href="/#newsletter">Newsletter</CustomLink></li>
            {
              user &&
              <li><CustomLink href="/profile">Profil</CustomLink></li>
            }
          </ul>
        </div>

        <div className={styles.auth}>
          {
            user ?
              <button className="btn-v2" onClick={handleLogout}>Se déconnecter</button>
              :
              <>
                <button className="btn-v2" onClick={() => handleNavigate("/login")}>Se connecter</button>
                <button onClick={() => handleNavigate("/register")}>S’inscrire</button>
              </>
          }
        </div>
      </div>

      {/* Courses sub-navbar */}
      {isPanelVisible && (
        <div className={styles.panel}>
          <a href={`/courses`}>Tout</a>
          {categories.map((c) => (
            <a key={c.id} href={`/courses/${c.name}`}>{c.name}</a>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
