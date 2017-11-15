# Container Orchestration

This set of examples covers the practical aspects of the Container Orchestration
Dojo. The following is set of instructions to install the required components
for the practical.

## Windows

1. Enable Hyper V in programs and features. _This is only available on Windows 10
   pro and above. If you do not have a valid version of Windows I suggest installing
   virtual box and running the solution in a linux vm instead._ *Note: Once you
   have enabled Hyper V, other virtualisation solutions will no longer work, such
   as virtual box.* Delay your restart until after the next step.

2. Install [Docker For Windows](https://www.docker.com/). If you would rather install
   docker machine instead, then do so at your own peril. The examples are done with
   Docker For Windows in mind. Restart your machine. Once restarted, you should
   see that Docker is running (If not the most likely case is that Hyper V is not
   working). To confirm that docker is running correctly, open a terminal and type
   `docker ps -a`. If don't see errors you are good to go.

3. Install [KubeCtl](https://kubernetes.io/docs/tasks/tools/install-kubectl/). There
   are a couple of methods to install this on windows, but the simplest is to just
   download the binary and put it in a PATH location.

4. Install [MiniKube](https://github.com/kubernetes/minikube/releases). You can just
   download the binary and put it into the PATH as well.

5. Start MiniKube with the Hyper-V Driver to check that everything is working okay.
   In your favourite terminal type `minikube start --vm-driver=hyperv`. If everything
   works you should see _Kubectl is now configured to use the cluster._ once it is
   completed. If you get any error messages I would suggest looking [here](www,google.com).
