FROM jenkins/jenkins:lts-jdk17

USER root

# Instalar Docker CLI dentro del contenedor
RUN apt-get update && \
    apt-get install -y docker.io && \
    usermod -aG docker jenkins && \
    rm -rf /var/lib/apt/lists/*

# Instalar kubectl (última versión estable)
RUN curl -fsSL https://dl.k8s.io/release/$(curl -fsSL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl && \
    chmod +x /usr/local/bin/kubectl

# (Opcional) Instalar Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

USER jenkins
