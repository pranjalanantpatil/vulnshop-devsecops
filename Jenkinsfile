pipeline {

    agent any

    environment {
        IMAGE_NAME = "vulnshop"
        DOCKER_USER = "pranjalpatil22"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                credentialsId: 'github-creds',
                url: 'https://github.com/pranjalanantpatil/vulnshop-devsecops.git'
            }
        }

         stage('Gitleaks Scan') {
            steps {
             sh 'gitleaks detect --source . --exit-code 0'
        }
   }


        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''
                    /opt/sonar-scanner/bin/sonar-scanner \
                    -Dsonar.projectKey=vulnshop \
                    -Dsonar.sources=.
                    '''
                }
            }
        }

        stage('Pre Trivy Scan') {
            steps {
                sh 'trivy fs . --exit-code 0'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t $DOCKER_USER/$IMAGE_NAME:latest .
                '''
            }
        }

        stage('Post Trivy Scan') {
            steps {
                sh '''
                trivy image $DOCKER_USER/$IMAGE_NAME:latest --exit-code 0
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh '''
                    echo "$PASS" | docker login -u "$USER" --password-stdin
                    docker push $DOCKER_USER/$IMAGE_NAME:latest
                    '''
                }
            }
        }
    }
}
