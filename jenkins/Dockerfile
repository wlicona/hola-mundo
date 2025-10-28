FROM jenkins/jenkins:lts-jdk17

USER root

# Instalar Docker CLI dentro del contenedor
RUN apt-get update && \
    apt-get install -y docker.io && \
    usermod -aG docker jenkins && \
    rm -rf /var/lib/apt/lists/*

USER jenkins
