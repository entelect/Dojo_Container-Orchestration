# Kubernetes

Kubernetes requires a bit of a different configuration compared to docker Swarm
and as such it will not be able to use the docker-compose files, but instead will
use a Kubernetes configuration for deployments.

In addition this example will assume that you are using minikube to deploy and
run the examples. And if you are on Windows, via the Hyper-V driver.

## Running

After installing Minikube and Kubectl you can run the following command. `minikube start --vm-driver=hyperv`.
After a while you should see the message _Kubectl is now configured to use the cluster._.
This should mean that it is working as expected. You can also run `kubectl config use-context minikube`
to tell kubectl to use minikube. Finally, if everything is working correctly you
should be able to run the command `kubectl cluster-info` and you should get a
valid message indicating that the cluster is running.

## Deployments

For the purpose of this example we want to create a deployment that allows you
to see the same types of examples as per the other examples. In order to do
this you will need to create a *Deployment* which tells Kubernetes what
containers you expect and if it should restart the container on failure.

### Mongo Deployment

Unlike before we need to deploy our applications to the server separately.
Starting with the Mongo database by running the following commands.

```
kubectl create -f mongo-deployment.yml
kubectl expose deployment mongo
kubectl describe svc mongo
```

This will create a deployment for mongo and expose that deployment to the
cluster. The final step is to get the ClusterIP for the mongo pod. You will
see something like what follows

```
Name:              mongo
Namespace:         default
Labels:            app=mongo
Annotations:       <none>
Selector:          app=mongo
Type:              ClusterIP
IP:                10.0.0.85
Port:              <unset>  27017/TCP
TargetPort:        27017/TCP
Endpoints:         172.18.0.4:27017
Session Affinity:  None
Events:            <none>
```

Take that IP and update the MONGODB environment in the machine-service and
web-server deployment files.

### Machine service

The next step is fairly straight forward. Run the command
`kubectl create -f machine-service-deployment.yml`. If the services can see
the server they should all start. To determine if they are running run the
command `kubectl get pods` to see the pods running on the cluster. And to
get information from a specific pod run `kubectl logs <POD_NAME>`.

### Web server

Finally to deploy the web server you need to run the following commands
```
kubectl create -f web-server-deployment.yml
kubectl expose deployment web-server --type=LoadBalancer
minikube service web-server
```
And if everything is working you should see the same type of page as the
Docker Swarm example.

## Clean up

Run the following commands to clean up the cluster after running.

```
kubectl delete deployment web-server
kubectl delete service web-server
kubectl delete deployment machine-service
kubectl delete deployment mongo
kubectl delete service mongo
```
