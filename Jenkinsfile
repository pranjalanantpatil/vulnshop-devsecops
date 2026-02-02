pipeline {

    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

	stage('SonarQube Scan') {
            tools {
               sonarRunner 'sonar-scanner'
            }
            steps {
               withSonarQubeEnv('sonar') {
                   sh '''
                   sonar-scanner \
                   -Dsonar.projectKey=vulnshop \
                   -Dsonar.sources=.
                   '''
                }
            }
         }

        
        stage('Gitleaks Scan') {
            steps {
                sh 'gitleaks detect --source .'
            }
        }

        stage('Dependency Check') {
            steps {
                sh 'dependency-check --scan .'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t vulnshop .'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image vulnshop'
            }
        }

    }
}
