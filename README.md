
# Evnironment, Installation
  - Nodejs, Docker, Kubernetes
  - Minikube, Node Nats Streaming
  - Skaffold. See https://skaffold.dev/docs/install/
  - Node Nats Streaming
 
## 1.2 Docker file is added to its services
fbi/Dockerfile, fbi_auth/Dockerfile

## 1.3 Kubernetes 
Deployment file has been added to infra/k8s directory

## 1.4 Automation of local develpment workflow 
 When we run skaffold dev then if we change any thing in our local machine file then It builds, pushs to docker hub and push to kubernets cluster too, We can do it manually as well
 - Build the image, Push to docker hub and then again kubectl apply -f {deployment_file_name.yaml}

## Installation
 ### For minikube need to enable ingress If we are in local environment, Clouds have their own deployment configuration file available for ingress inginx
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
    # When new user is registered then fbi services also get notified about that   
    # the user is added, all abstract typescript class which define inside common folder 
    # can be use in different services, to know the subject, event type, event data type etc

## How to run test
## install dependencies for fbi service
  cd fbi && npm install 

  ## install dependenceis for auth services
  cd ../fbi-auth && npm install 

  ## can be run in both folder fbi and fbi-auth 
  npm run test 
  ```
### Scaling our application 
In k8s folder in deployment files for each configuration file if we increase the number for replicas then, one way we can increase number for replicas, but on the other hand It will consume more resources too.

### Presistent Cahing 
We can use Redis, Memcached to store our caching https://www.npmjs.com/package/redis

### Logging 
Yes we do log, but right know due to timeline I was not be able to implement logging rather I am using simple console, It is important to log in any application for example in current circumstances 
    • Any kind of Debug, Info, Warning, Error
    • If NATS has some issue for the connection, 
    • Some keys has been missed in Kubernetes cluster for example 
    • NATS_CLIENT_ID or JWT_KEY is undefined
    • minibike may be stopped to work due to out of store in container, storage might be out of capacity, 
    • Loading Balancing, Store Management, Application 
    • database is down the communication with other microservice was unsuccessful
    • It can be anything in our  application, in infrastructure  etc

There is different way of logging in Nodejs, Kubernetes application for example in application level log4js, Winston, More robots service such as ELK Stack but with my opinion what I things is best way to log in Kubernetes is to have separate services which listen event when ever anything we need to log from the application then its simply publish the event the concern pods/service handle the logging, where we have proper model for log handling the its saves in permanent storage

### Persistent Caching 
I can integrate Velero.io to our application which provides safely backup and restore, perform disaster recovery, and migrate Kubernetes cluster resources and persistent volumes. For that we need to have bucket provider either and persistent volumes provider which is premium services
      
### We can imporve
- Utilize all CPU cores
- Delegate gzip, SSL to a reverse proxy 
- Documentation using Swagger.io
- Enable brute force protection
- Cluster monitoring tools
- Resource Management
- Keep evaluating the state of application 


### Caching 
Well, I have created service inside the Kubernetes cluster to serve Redis server to save the data to the permanent catch , so that we will not request to the server each time as peruser request to our backend server,

Normally how we cache the data, for example I have list of wanted list and I have a lot of query such as get by office, locations, title it can be anything which is available in our each item attributes.

When I have access of full data then for example I have 10000 records in total then, this data become source of caching and rest of the query I will have to do from my script for example getting 10 first item from the array 

const cached = data;
const getItem = data.slice(skip, limit)  // SELCT * FROM wanted list  skip(init) limit(init)
// In the same way we do in SQL 
User can do query to our data in different way therefore we are not storing all ways but we are storing source of data and query on the data which is available through the cache

But the current api 
https://api.fbi.gov/wanted/v1/list

and designing caching system in this system require more time.

Caching system work with for example database or any other source where data get permanently save and at the same time there is different kind of cache policy for example Write through cache, Write around cache, Write back cache

but what I found is,  in current situation and the time frame all our query can not perform until and unless I spent more time on it in current situation

In real world its not more efficient to caching each user query to our caching server and serve to the client, More efficient when we have source of data available, then we do our query through our application 

### Request 
Hope I will have opportunity to discuss how this application can be improved and more things which has not been done, How they can be accomplished