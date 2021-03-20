
# Introduction

This project is setup with 
  -  Nodejs v14.15.0 and npm 6.14.8 with TypeScript
  -  Jest for testing 
  -  Express
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
  - Node Nats Streaming
 
## 1.2 Docker file is added to its services

## 1.3 Kubernetes 
  - Deployment file is added  infra/k8s directory

## 1.4 Automation of local develpment workflow 
  - when we run skaffold dev then if we change any thing in our local machine any file then It build, push to docker hub and push to kubernets cluster too

## Installation
 ### If you are using docker in mac with minikube then, need to install following module 
 ``` bash 
 minikube addons enable ingress

 #more Details: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

 # need to expose the node port to ingress inginx controller 
 kubectl expose deployment ingress-nginx-controller --target-port=80 --type=NodePort -n kube-system

  ## Security  
    # When fetching the FBI Wantend list routes are protected
  
  ## Event Subscriptions
    # When we are fetching something then its publishs event to kubernets cluster 
    # Other services can subscribe to listen, for example we have fbi-auth service
    # fbi-auth service listening the event from fbi service in the same way 
    # We new user is registered then fbi services also get notified about that   # the user is added, all abstract typescript class which define which even - # uses what kind of data is defined is common module and I have created npm 
    # packages so I can use in different services when Its needed.

## How to run test
## install dependencies for fbi service
  cd fbi && npm install 

  ## install dependenceis for auth services
  cd ../fbi-auth && npm install 

  ## can be run in both folder fbi and fbi-auth 
  npm run test 
  
## Scaling our application 
  ### In k8s folder in our deployment file for each configuration file if we increase the number for replicas then, one way we can increase number for replicas, but on the other hand It will consum more resources too.

## Presistent Cahing 
 ### We can use Redis, Memchacned to store our cahcing https://www.npmjs.com/package/redis, Due to deadlines I could not be able to implement it