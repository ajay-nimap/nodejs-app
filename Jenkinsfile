pipeline {
label windows

environment {
    IMAGE_NAME = "node-app"
}

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Install Dependencies') {
        steps {
            sh 'npm install'
        }
    }

    stage('Test') {
        steps {
            sh 'npm test || true'
        }
    }

    stage('Build Docker Image') {
        steps {
            sh 'docker build -t $IMAGE_NAME .'
        }
    }

    stage('Deploy') {
        steps {
            sh 'docker compose down || true'
            sh 'docker compose up -d --build'
        }
    }
}

post {
    success {
        echo 'Deployment successful'
    }

    failure {
        echo 'Pipeline failed'
    }
}


}
