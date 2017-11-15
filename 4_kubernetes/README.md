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

To create our *Deployment* run `kubectl apply -f dojo-deployment.yml`. It
will be possible to inspect the *Deployment* by running `kubectl describe deployment dojo-deployment`.
