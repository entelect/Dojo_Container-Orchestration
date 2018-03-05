# Kubernetes

Kubernetes requires a bit of a different configuration compared to docker Swarm and as such it will not be able to use 
the docker-compose files, but instead will use a Kubernetes configuration for deployments. Unless you plan to use the
Kubernetes cluster include with Docker 18.02 and later versions. You can then you docker-compose to deploy pods instead.

In addition this example will assume that you are using minikube to deploy and run the examples. And if you are on 
Windows, via the Hyper-V driver. Or prefably using the built in cluster as part of Docker For Windows / Mac.

## Running

### Minikube

After installing [Minikube](https://github.com/kubernetes/minikube) and [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 
you can run the following command. **NB**: If you plan to use Docker For Windows / Mac, you will not need to install
kubectl. It is bundled as part of the engine instead. If you use Linux then minikube is the preferred method of running
a kubernetes cluster locally.

```
minikube start --vm-driver=hyperv
```

You may also need to set up a separate virtual switch in hyperv and run the command instead.

```
minikube start --vm-driver=hyperv --hyperv-virtual-switch=new-switch
```

Also if you have installed to a separate drive you should also set `$env:MINIKUBE_HOME = "<LOCATION OF MINIKUBE>"` if
you are finding that the cluster fails to start.

After a while you should see the message _Kubectl is now configured to use the cluster._. If you do not see that message
I would suggest search for the error message to try and see what the problem is. This should mean that it is working as 
expected. You can also run `kubectl config use-context minikube` to tell kubectl to use minikube. Finally, if everything
is working correctly you should be able to run the command `kubectl cluster-info` and you should get a valid message 
indicating that the cluster is running.

### Running on Docker For Windows/Mac

**NB: For the purpose of the Dojo I would recommend using Docker For Windows on Edge Release instead of Minikube**

As from version 18.02 you can use the docker engine instead of minikube for deployment. If you want to just use a single
cluster kubernetes I would highly recommned this option over minikube, especially for windows. In order to use this
feature, install the _edge_ version of docker and enable kubernetes via **settings->kubernetes->Enable Kubernetes**.
Once enabled you can see the status of the kubernetes cluster in the bottom left of docker settings window. In addition
you should check that your _kubectl_ is using the correct context. You can run the following commands to verify your
configuration

```
kubectl config get-contexts
kubectl config use-context docker-for-desktop
```

This will have some impact on how some of the configuration works, because the docker-for-desktop cluster comes with
DNS support by default. Where approipriate the README.md will indicate the differences between using minikube and
docker-for-desktop.

## Enabling Kubernetes Dashboards

In either Cluster you run the following commands to enable the Kubernetes Dashboard, which is a useful tool for seeing
how applications are running on your cluster.

```
kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
```

Once completed you can see the dashboard pods by running 

```
kubectl -n kube-system get pods
NAME                                         READY     STATUS    RESTARTS   AGE
etcd-docker-for-desktop                      1/1       Running   0          14d
kube-apiserver-docker-for-desktop            1/1       Running   0          14d
kube-controller-manager-docker-for-desktop   1/1       Running   0          14d
kube-dns-6f4fd4bdf-x6crp                     3/3       Running   0          14d
kube-proxy-dfm8z                             1/1       Running   0          14d
kube-scheduler-docker-for-desktop            1/1       Running   0          14d
kubernetes-dashboard-5bd6f767c7-58xmk        1/1       Running   0          1m
```

You can then update the port forwarding by running the following command (Obviously replace the kubernetes-dashboard with
the name of the pod as per your machine.)

```
kubectl -n kube-system port-forward kubernetes-dashboard-5bd6f767c7-58xmk 8443:8443 
```

For additional information have a look at the guides [here](https://rominirani.com/tutorial-getting-started-with-kubernetes-with-docker-on-mac-7f58467203fd)
and [here](https://www.hanselman.com/blog/HowToSetUpKubernetesOnWindows10WithDockerForWindowsAndRunASPNETCore.aspx).

## Deployments

For the purpose of this example we want to create a deployment that allows you to see the same applications as per the 
other examples. In order to do this you will need to create a *Deployment* which tells Kubernetes what containers you 
expect and if it should restart the container on failure. In addition networking requires a little more manual 
configuration to expose the containers to each other and to the host machine. All interactions with the cluster require
the use of [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), which is a CLI tool for interacting with 
Kubernetes. For the purpose of this example, the configuration will be saved as YAML files. Configuration can also be
provided as a set of parameters on the _kubectl_ command as well.

A Deployment is responsible for configuring a ReplicaSet, which in turn is responsible for managing pods. A pod usually
wraps a container, but it could wrap more than one containers. A Pod is the fundamental block that the kubernetes 
cluster uses to manage containers, each pod can be deployed to a node in a kubernetes cluster. Pods provide a abstraction
from the container, that the cluster can use to identify and discover. A ReplicaSet defines how many Pods should be 
created for the cluster. 

### Mongo Deployment

Unlike in the Docker-Compose examples, applications deployed on Kubernetes are generally configured via Deployments. In
order for Mongo to be functional we will need to tell Kubernetes to create a Pod that runs the Mongo container. You could
add other containers to the Pod, but if you ever scale the Pods it will duplicate all containers in the Pod. So in order
to save resources it is recommended that each Pod is kept as simple as possible.

You can create a deployment by running the command below. The _mongo.yml_ contains two documents, one which defines the
Deployment, and another which defines the service. A service is how Pods are exposed to the Kubernetes Cluster, unlike
Docker-Compose which automatically creates Docker Networks for Container to Container communication. The service on the
other hand will be linked to **all** Pods that match the service definition, and will perform automatic load balancing
between Pods. 

```
kubectl apply -f mongo.yml
kubectl describe svc mongo
```

The first command will create a deployment for mongo and expose that deployment to the cluster. You could also use the 
_create_ command as well, the difference is that _apply_ will update an existing Deployment if the exists, while _create_
will fail if the Deployment already exists. The results of `kubectl describe svc mongo` will show the service that was
configured for the mongo application.

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

The service will allow any Pod in the cluster the ability to reference the Pods by "DNS" name instead of having to try
use the IP Address. **NB**: This type of service only allows access within the cluster, it will not allow you to access
the Pods from your local machine for example.

### Machine service

The next step is fairly straight forward. The machine service deployment will create a set of machine services, which
will automatically create 5 Pods for the machine services and connect them to the Mongo Database automatically. To load
the configuration run the command
```
kubectl create -f machine-service-deployment.yml
```
If the services can see the server they should all start. To check the status of the pods you can run the command

```
kubectl get pods
``` 

Which will display all of the pods running on the cluster. It will only display Pods in the _default_ namespace. And to
get information from a specific pod run `kubectl logs <POD_NAME>`. If everything is configured correctly you should see
the `Updated information for  <POD_NAME>` messages that the machine service logs when it polls.

### Web server

The last component of the application is the web server. Unlike the previous two deployments we want to expose the
web server pod outside of the cluster. In order to achive that we want to configure the Web server Service with the 
type LoadBalancer. 

```
kubectl apply -f web-server-deployment.yml
# The minikube cluster will require you to run the below command as well. This is not required for the Docker Desktop
# cluster.
minikube service web-server
```

If you are running with Docker for Desktop you can look for the exposed Web Server Service by running the command
`kubectl get services -o wide`, which will return all of the Services exposed on the cluster. Unlike the mongo service
you should get the type _LoadBalancer_ for the Web Server instead of _ClusterIP_. For the given example your EXTERNAL-IP
should be _localhost_. Which means you should be able to access the site by going to http://localhost:8080 in your browser.

## Clean up

Run the following commands to clean up the cluster after running.

```
kubectl delete -f machine-service.yml
kubectl delete -f web-server.yml
kubectl delete -f mongo.yml
```
