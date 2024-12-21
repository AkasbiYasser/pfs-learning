pipeline {
    agent any
    environment {
        ACR_NAME = 'PFSAcr'
        ACR_URL = "${ACR_NAME}.azurecr.io"
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AkasbiYasser/pfs-learning.git', credentialsId: 'github-token'
            }
        }

        stage('Build Project') {
            steps {
                script {
                    sh '''
                        echo "Building the project..."
                        cd Backend/Z-Learning
                        mvn clean install -DskipTests
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh '''
                        echo "Building Docker Images..."
                        docker-compose build
                    '''
                }
            }
        }

        stage('Push Docker Images to ACR') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'acr-token', usernameVariable: 'ACR_USERNAME', passwordVariable: 'ACR_PASSWORD')]) {
                        sh '''
                            docker login ${ACR_URL} -u ${ACR_USERNAME} -p ${ACR_PASSWORD}
                    
                            # Utiliser les noms d'image en minuscules
                            docker tag frontend ${ACR_URL}/frontend:latest
                            docker tag backend ${ACR_URL}/backend:latest

                            docker push ${ACR_URL}/frontend:latest
                            docker push ${ACR_URL}/backend:latest
                        '''
                    }
                }
            }
        }

        stage('Deploy to AKS') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'aks-token', variable: 'KUBECONFIG')]) {
                        sh '''
                            echo "Deploying to AKS..."

                            kubectl apply -f k8s-manifests/frontend-deployment.yaml --kubeconfig=$KUBECONFIG
                            kubectl apply -f k8s-manifests/backend-deployment.yaml --kubeconfig=$KUBECONFIG
                            kubectl apply -f k8s-manifests/mongodb-deployment.yaml --kubeconfig=$KUBECONFIG
                        '''
                    }
                }
            }
        }
    }
    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs."
        }
    }
}
