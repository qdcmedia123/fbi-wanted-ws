# Introduction

The goal of the code challenge is to create an asynchronous version of an existing REST API, using websockets.

Please do not spend more than 3 hours working on this task. However, if you feel you want to spend more time on the task, that's okay.

We are expecting an application that we can run with one or more integration tests demonstrating a working application. The application does not have to be feature complete.

There are many tasks listed below and we do NOT expect you to finish implementing all of them within 3 hours.

You can choose to skip or adjust the scope of a task in a meaningful way, if you think it would take too much time to implement.
Please write a comment on your rational, and a few notes on how you would go about solving it, given you had 3 days rather than 3 hours to finish up.

All tasks (both finished and unfinished) will be discussed in the post challenge interview.

We are just as much interested in what you are thinking as the code you have written.

The application you create must be a Node.js application and it should be written in Typescript.

This Node.js project is set up with:
  - Typescript (https://www.typescriptlang.org/)
  - Jest for testing (https://www.npmjs.com/package/jest)
  - Dependencies that might be useful:
    - express (https://www.npmjs.com/package/express)
    - ws (https://www.npmjs.com/package/ws)
    - dotenv (https://www.npmjs.com/package/dotenv)
    - node-fetch (https://www.npmjs.com/package/node-fetch)

You can choose to use them or replace them with any other packages you prefer.

Your project should contain a README with instructions on how we can:

- install
- build
- start
- run integration test


# Prerequisite

This challenge will touch on some of the subjects you would see daily on the job:

- Node.js
- Typescript
- REST
- Websockets
- Docker
- Kubernetes

You will probably need the following installed before you start the task:

- NodeJS. See: https://nodejs.org/en/download/
- Docker. See: https://docs.docker.com/engine/install/
- Kubernetes command-line tool. See: https://kubernetes.io/docs/tasks/tools/
- Minikube: for running a local Kubernetes cluster. See: https://minikube.sigs.k8s.io/docs/

If you want to use other tools in addition, that's fine, just make a note of it in the README.

Note: You don't need to count installation and configuration time as part of the task duration.

# 1 Websocket API

You will be working with the FBI Wanted REST API.

Official API description: https://www.fbi.gov/wanted/api 

The REST API provides a single endpoint with pagination and search options.

Example:

​	Get the first page of items where field_offices=miami and sex=male

```
# List of items
curl -X GET https://api.fbi.gov/wanted/v1/list\?page\=1\&field_offices\=miami\&sex\=male -H  "accept: application/json"
```
The returned items also contains an @id property with an url that you can use to poll that single item.

```
# Fetch single item using the @id property url of the item.
curl -X GET https://api.fbi.gov/@wanted-person/99ffed7830acba90db8a7198b9c53afd -H  "accept: application/json" 
```

See the `sample_data` folder for a sample JSON response.

Your task is to create an asynchronous version of the API using websockets.

## 1.1 Websocket API in NodeJS

- Create a websocket server application in NodeJS that serves the same information as the REST API. The application should work as an asynchronous proxy for the actual REST API.
- Should support listing of items and pagination. The search possibility can be ignored.
- Create an integration test for your service.

## 1.2 Docker image

Package your application into a Docker image.

## 1.3 Kubernetes

Write a Kubernetes deployment descriptor for the application and deploy it to a local cluster.

## 1.4 Automation of local development workflow

A decent level of automation of the local build/run/integration-test cycle would be nice.

By automation, we mean one or more scripts that simplify command execution, like:

- building the docker image
- deployinging to local cluster
- running integrations tests
- ..etc

This will be helpful in local development, but it could also ease any future setup in a CI/CD environment/pipeline.

# 2 Caching

If we cache the REST service data in our application, we would be able to:
- speed up our service response time
- provide data to our user when the offical REST sevice is unavailable
- provide more fine-grained retrieval options

Add caching to our service and implement a way to fetch a single specific item (specified by the item's 'uid') from the websocket API.

# 3 Event subscriptions

To enable an event-driven use of our API, we want to offer a way to subcribe to events in our API.

Add the option to subscribe to one of the following events in our websocket API:
- a specific existing item was updated
- a new item was added
- a specific item was requested (get notification when someone else fetches a specific item)
- ...or you can define your own event that you want the websocket API to support.

# 4 Persistent caching

What happens if our application crashes or needs a restart?

Make sure the caching of data is persistent so that we do not suffer data loss in case of an application crash or restart.

# 5 Security

The FBI Wanted REST API is public and requires no authentication.

Our websocket version of the API now has additional features that we do not want people to use without authentication.

How could we secure our new features, while still allowing public access to the inital list items feature?

# 6 Logging

Do we log anything in our application?

What should we log and how?

# 7 Scaling

Is our application ready to scale?

What changes do we need to make to run multiple replicas in our Kubernetes cluster?

# 8 Other

Anything else you would suggest to improve the application, developer experience, build pipeline, etc. ?

## Caching 
Well, I have created service inside the Kubernetes cluster to serve Redis server to save the data to the permanent catch , so that we will not request to the server each time as per user request to our backend server,

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

## Request 
Hope I will have opportunity to discuss how this application can be improved and more things which has not been done, How they can be accomplished in more effective way 
