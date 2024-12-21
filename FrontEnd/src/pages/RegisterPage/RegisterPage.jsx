import styles from "./RegisterPage.module.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

//components
import Logo from "../../components/Logo/Logo";

function RegisterPage() {
  const navigate = useNavigate();

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://rssplearning.tech/user/register', {
        lastName: lastName,
        firstName: firstName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        admin: false,
        courseList: []
      });

      const user = response.data;
      console.log(user);
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      navigate("/");
    } catch (error) {
      alert("Erreur");
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <Logo />
      <form className={styles.registrationForm}>
        <h1>Inscription</h1>
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.info}>Déjà inscrit(e) <a href="/login">Se connecter</a></p>
        <button onClick={handleRegister}>S'inscrire</button>
      </form>
    </div>
  );
}

export default RegisterPage