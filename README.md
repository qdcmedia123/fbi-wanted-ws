
# Evnironment, Installation
- Nodejs with TypeScript, Jest
- Docker
- Kubernetes
- Minikube
- Skaffold, See https://skaffold.dev/docs/install/
- Node Nats Streaming
- MongoDB
- REST

## Websocket API in NodeJS
Node Nats Streaming has been used to create event based server(web socket), While fetching the FBI Wanted list, at the same time the api publish event called FetchedFBIWantedlist, other services can listen to that
event with data structure placed in listener folder of each service

## 1.2 Docker file is added to its services
Docker files has been added to its service fbi/Dockerfile, fbi_auth/Dockerfile

## 1.3 Kubernetes 
Deployment files has been added to infra/k8s directory

## 1.4 Automation of local develpment workflow 
When we run skaffold dev then if we change any thing in our local machine files then It builds, pushes to docker hub and apply deployment files, you can do it manually as well
- Build the image, 
- Push to docker hub 
- kubectl apply -f {deployment_file_name.yaml}

## Installation
``` bash 
# install skaffold 
https://skaffold.dev/docs/install/

# If you are using minikube in mac then start minikube with hyperkit driver 
minikube start --vm-driver=hyperkit

# Enable ingress 
minikube addons enable ingress

# More Details: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/

# Need to expose the node port to ingress inginx controller 
kubectl expose deployment ingress-nginx-controller --target-port=80 --type=NodePort -n kube-system

# add secret to our cluster, its used in auth service and in testing too
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

# install dependencies for fbi service
cd fbi && npm install 

# install dependencies for auth services
cd ../fbi-auth && npm install 

# can be run in both folder fbi and fbi-auth, this is test in local environment, when we push to GitHub or GitLab we will have our git hub action where all test will run there too
npm run test 

# Running kubernetes cluster with skaffold run in root folder of the project eg(fbi-wanted-ws)
skaffold dev 
``` 
## Would like to test as a real client from postman
``` bash
# Find the IP Address of minikube 
minikube ip #192.168.64.10

# Open host file 
sudo gedit /etc/hosts

# add your minikube ip and one random domain name fbi.dev to host file
192.168.64.10 fbi.dev

# In the settings, turn off the SSL certificate verification option in postman

# We have many routes, You should be able to access some of them
URL METHOD Payload 
https://fbi.dev/api/users/signup POST {"email": "test@gmail.com", "password": "password"} 
https://fbi.dev/api/fbi/list GET FBI Wanted List with Event Published to other services
```

## Security 
https://fbi.dev/api/fbi/list is publice but 
https://fbi.dev/api/fbi/fbiById/:uid is protected, User must be login or sign up

### Event subscriptions
When we are fetching FBI Wanted List then its publishes event to Kubernetes cluster. Other services can subscribe to listen, for example we have fbi-auth service fbi-auth service listening the event from fbi service in the same way. When new user is registered then fbi services also get notified about that, the user is added, all abstract typescript class which define inside common folder can be use in different services, to know the subject, event type, event data type etc

### Scaling our application 
In k8s folder in deployment files for each configuration file if we increase the number for replicas then, one way we can increase number for replicas, but on the other hand It will consume more resources too.

``` bash
#spec:
# replicas: 1
# selector:

```

### Logging 
Yes we do log, I am using simple console due to timeline, It is important to log in any application for example it can be different reason, for example 
- Any kind of Debug, Info, Warning, Error
- If NATS has some issue for the connection, 
- Some keys has been missed in Kubernetes cluster for example 
- NATS_CLIENT_ID or JWT_KEY is undefined
- Minibike may be stopped to work due to out of store in container, storage might be out of capacity, 
- Issue with Loading Balancing, Store Management, Application 
- Database is down the communication with other microservice was unsuccessful
- It can be anything in our application, in infrastructure etc

There is different way of logging in Nodejs, Kubernetes application for example in application level log4js, Winston, More robots service such as ELK Stack but with my opinion what I thing is best way to log in Kubernetes is to have separate services which listen event whenever anything we need to log from the application then its simply publish the event to the concern pods/service which handle logging, where we have proper model for log handling the its saves in permanent storage such as MySQL, MongoDB, PostGreSQL

### Persistent Caching 
I can integrate Velero.io to our application which provides safely backup and restore, perform disaster recovery, and migrate Kubernetes cluster resources and persistent volumes. For that we need to have bucket provider either and persistent volumes provider which is premium services provided by different cloud service provider

### Caching 
Lets say for example I would like to get second page from the db and each page should be 20 item and office = ’miami’ SQL Query will be something like this 

SELECT Field_name from table where office = ’Miami’ limit skip limit 

In the same way If I do query from our cache then query could be something like this 

const data = cachedData;
const query = data.filter(function(item){
  return item.office === ’miami’
}).slice(skip, limit);

Existing api does not provide complete data  https://www.fbi.gov/wanted/api

I can still implement the cache system in current scenario but It will take time and moreover it will not be more efficient, resuable, can handle different user query and for large data we will have to store large number of query in cached data.

Hence, When we have data source then we can do query as much as we wants

### We can imporve
- Delegate gzip, SSL to a reverse proxy 
- Documentation using Swagger.io
- Enable brute force protection
- Cluster monitoring tools
- Resource Management
- Keep evaluating the state of application 
- Too many request Prevention
- Avoid DOS attacks by explicitly setting when a process should crash
- While Developing pipeline creating github workflow, github action and running testing and apply all Kubernetes setting from github, We can use jenkins server as well
- etc

### Request 
Hope I will have opportunity to discuss how this application can be improved and more things which has not been done can be done in more practical way, How they can be accomplished

