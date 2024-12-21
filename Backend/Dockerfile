# Utilisation de l'image officielle Java
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR généré depuis l'emplacement dans Jenkins
COPY Z-Learning/target/Z-Learning-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port sur lequel l'application fonctionne
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
