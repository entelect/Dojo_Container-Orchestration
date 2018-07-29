# Container Orchestration

This set of examples covers the practical aspects of the Container Orchestration Dojo. The following is set of 
instructions to install the required components for the practical. Each directory covers a particular concept with 
additional documentation provided.

## Windows

1. Enable Hyper V in programs and features. _This is only available on Windows 10 pro and above. If you do not have a 
   valid version of Windows I suggest installing virtual box and running the solution in a linux vm instead._ **Note: 
   Once you have enabled Hyper V, other virtualisation solutions will no longer work, such as virtual box.** Delay your 
   restart until after the next step.

2. Install [Docker For Windows](https://www.docker.com/). If you would rather install docker machine instead, then do so
   at your own peril. The examples are done with Docker For Windows in mind. Restart your machine. Once restarted, you 
   should see that Docker is running (If not the most likely case is that Hyper V is not working). To confirm that 
   docker is running correctly, open a terminal and type `docker ps -a`. If don't see errors you are good to go.

3. Install [KubeCtl](https://kubernetes.io/docs/tasks/tools/install-kubectl/). There are a couple of methods to install 
  this on windows, but the simplest is to just download the binary and put it in a PATH location. **You will not need to
  do this if you have Docker version 18.02 or above, since kubernetes is bundled together with Docker**

4. Install [MiniKube](https://github.com/kubernetes/minikube/releases). You can just download the binary and put it into
   the PATH as well. **You will not need to do this if you are using Docker version 18.02 or above, instead you will
   enable the Kubernetes cluster in the Docker Prefernces instead**.

5. Start MiniKube with the Hyper-V Driver to check that everything is working okay. In your favourite terminal type 
  `minikube start --vm-driver=hyperv`. If everything works you should see _Kubectl is now configured to use the cluster._ 
  once it is completed. If you get any error messages I would suggest looking [here](www,google.com). **Again, not required
  if you have Docker Version 18.02 or above**

### Chocolately Install

If you prefer to use a package manager to install, then install the [chocolately](https://chocolatey.org/) package manager 
which will then allow you to install the components with the following commands. You can also just install docker for
windows and switch to edge instead if you don't want to install kubernetes and minikube.

```
choco install docker-for-windows -y
choco install kubernetes-cli -y
choco install minikube -y
```

 ## Troubleshooting

 If you are having problems pulling docker images, it might be that Docker is trying to use Minikube. You can try and 
 reset to factory settings in the Docker settings to resolve this issue. 
 
 Minikube might fail to start, this might occur if you have multiple drives, you will need to ensure that you run the 
 Minikube commands on the primary drive.

 If you are running version 18.02 of Docker or above, you might have problems running Swarm and Kubernetes at the same
 time. You can disable the Kubernetes cluster to work with Swarm when you want to use Swarm mode.

 ## Keeping it Clean

 Use `docker system prune` to remove dangling images and containers. Just be aware that you could potentially lose data
 doing this. To really clean up your docker images run `docker system prune -a` which will remove all images not currently
 in use.
