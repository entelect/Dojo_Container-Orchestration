# Docker Swarm

Perform orchestration by using the Docker Swarm functionality. This is an natural
extension of docker-compose and you could use the previous examples docker-compose
on a swarm cluster instead. We will use the previous examples containers and run
them on a swarm cluster.

## Running

Pick a manager node and get the IP Address of that machine.

```
ifconfig
```

Then run the swarm initialize command

```
docker swarm init --advertise-addr <MANAGER-IP>
```

You may leave out the _--advertise-addr_ if you want to run a single node cluster.
Run the following commands to see the status of the Swarm

```
docker info
docker node ls
```

You can join nodes to the swarm by running the following command

```
docker swarm join \
  --token  <MANAGER_TOKEN> \
  <MANAGER_ADDRESS>
```

You may add services to the swarm by running the following command

```
docker service create --replicas 1 --name helloworld alpine ping docker.com
```

## Deploying to the Stack

You will need a registry for running the swarm nodes correctly. You can create a
registry with the command `docker service create --name registry --publish 5000:5000 registry:2`
or just register on DockerHub. For the purposes of this example we will just use
DockerHub.

You will notice that the docker-compose file no longer has the build commands in it,
instead it will pull the images from DockerHub instead.

To start the stack run `docker stack deploy --compose-file docker-compose.yml demo`
and to check the stack run `docker stack services demo` and you should see the
services running like before in the Docker Compose example.

Bring the stack down with `docker stack rm demo` and `docker swarm leave --force`
to leave the swarm.
