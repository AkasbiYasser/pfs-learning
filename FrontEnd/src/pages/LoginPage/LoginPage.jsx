import styles from "./LoginPage.module.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

//components
import Logo from "../../components/Logo/Logo";

function LoginPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://rssplearning.tech/user/login', userData);
      
      const user = response.data;
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      if (user.admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Erreur");
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Logo />
      <form className={styles.loginForm}>
        <h1>Connexion</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <p className={styles.info}>Pas encore inscrit(e) <a href="/register">S'inscrire</a></p>
        <button onClick={handleLogin}>Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage