pipeline {
    agent {
        label 'windows'
    }

    environment {
        IMAGE_NAME = 'node-app'
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
             agent { label 'built-in' }
            steps {
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Deploy Application') {
             agent { label 'built-in' }
            steps {
                sh 'docker compose down || exit'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully.'
        }

        failure {
            echo 'Pipeline execution failed.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
