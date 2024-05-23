import styles from "./ProfilePage.module.css";

//images
import User from "../../assets/images/user.png";

//Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.profilePicContainer}>
            <img
              src={User}
              alt="User"
              className={styles.profilePic}
            />
            <h2 className={styles.userName}>{`${user.firstName} ${user.lastName}`}</h2>
          </div>
          <div className={styles.userDetails}>
            <div>
              <p className={styles.userDetail}>Nom:</p>
              <div className={styles.userdata}>
                <input className={styles.input} type="text" name="lastName" placeholder="Nom" value={user.lastName} onChange={handleInputChange} />
              </div>
              <p className={styles.userDetail}>Prénom:</p>
              <div className={styles.userdata}>
                <input className={styles.input} type="text" name="firstName" placeholder="Prenom" value={user.firstName} onChange={handleInputChange} />
              </div>
            </div>
            <p className={styles.userDetail}>Adresse e-mail:</p>
            <div className={styles.userdata}>
              <input className={styles.input} type="email" name="email" placeholder="user@example.com" value={user.email} onChange={handleInputChange} />
            </div>
            <p className={styles.userDetail}>Numéro de téléphone:</p>
            <div className={styles.userdata}>
            <input className={styles.input} type="number" name="phoneNumber" placeholder="0612-333-321" value={user.phone} onChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage
