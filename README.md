
# Introduction

This project is setup with 
  -  Nodejs v14.15.0 and npm 6.14.8 with TypeScript
  -  Jest for testing 
  -  Dependencies that is used in this project
  -  Express, @sweettech123/common, 
  -  @sweettech123/common
  -  @types/cookie-session
  -  @types/express
  -  @types/jsonwebtoken
  -  @types/mongoose
  -  cookie-session
  -  express
  -  express-async-errors
  -  express-validator
  -  jsonwebtoken
  -  mongoose
  -  ts-node-dev
  -  typescript

# Evnironment, Installation
  - Nodejs, Docker, Kubernetes, 
  - Minikube, Node Nats Streaming, 
  - Skaffold. See https://skaffold.dev/docs/install/
 
## 1.1 Web socket is created by NATs
## 1.2 Docker file is added the its services
## 1.3 Kubernetes 
  - Deployment file is added  infr/k8s directory
## 1.4 Automation of local develpment workflow 
  - when we run skaffold dev then if we change any thing in our local machine any file then It build, push to docker hub and push to kubernets cluster too

## Installation
 # If you are using docker in mac with minikube then, need to install following module 
 ``` bash 
 minikube addons enable ingress

 more Details: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

 # need to expose the node port to ingress inginx controller 
 kubectl expose deployment ingress-nginx-controller --target-port=80 --type=NodePort -n kube-system

## 1.5 How to run integration test 
  # after downloading the whole project please install the dependencies 
  ```
  # add secret to the kubernetes cluster because its used in our testing 
  kubectl create secret generic jwt-secret  --from-literal=JWT_KEY=asdf
  # install dependencies for fbi service
  cd fbi && npm install 

  #install dependenceis for auth services
  cd ../fbi-auth && npm install 

  # After installation is done in both directory then in each directory
  npm run test 

