import axios from 'axios';
import styles from "./DashboardAdmin.module.css";
import { useState, useEffect } from "react";

// Components
import StateCard from "../StateCard/StateCard";

// Logos
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CategoryIcon from '@mui/icons-material/Category';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';

function DashboardAdmin() {
    const [dashboardData, setDashboardData] = useState({
        coursesNr: 0,
        categoriesNr: 0,
        instructorsNr: 0,
        studentsNr: 0,
    });

    // Fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesNr, categoriesNr, instructorsNr, studentsNr] = await Promise.all([
                    axios.get('https://rssplearning.tech/admin/courses/nr'),
                    axios.get('https://rssplearning.tech/admin/categories/nr'),
                    axios.get('https://rssplearning.tech/admin/instructors/nr'),
                    axios.get('https://rssplearning.tech/admin/students/nr'),
                ]);

                setDashboardData({
                    coursesNr: coursesNr.data,
                    categoriesNr: categoriesNr.data,
                    instructorsNr: instructorsNr.data,
                    studentsNr: studentsNr.data,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h3>Dashboard</h3>
            <div className={styles.body}>
                <StateCard
                    title="Cours"
                    number={dashboardData.coursesNr}
                    logo={<AutoStoriesIcon />}
                    color="#328ac1"
                />
                <StateCard
                    title="Catégories"
                    number={dashboardData.categoriesNr}
                    logo={<CategoryIcon />}
                    color="#7e28a6"
                />
                <StateCard
                    title="Instructeurs"
                    number={dashboardData.instructorsNr}
                    logo={<BadgeIcon />}
                    color="#dd9e29"
                />
                <StateCard
                    title="Étudiants"
                    number={100}
                    logo={<GroupsIcon />}
                    color="#53c132"
                />
            </div>
        </div>
    );
}

export default DashboardAdmin;