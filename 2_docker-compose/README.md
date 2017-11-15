# Docker Compose

This section contains a example orchestration by using docker-compose to build a
simple cluster with a web server, service and mongo database.

## Building

You can build the containers by running `docker-compose build` in the directory
that the docker-compose file is located. It will build all of the services that
are listed in the docker-compose file

## Running

You can start the cluster by running `docker-compose up` in the current directory.
This will start all of the containers listed in the docker-compose yaml file. If
the containers do not exist it will build them for you based on the build config.
You may also want to use `docker-compose up --build` to force a rebuild if changes
have been made to the configuration.

Finally, to scale the number of containers in the cluster you can run the
`docker-compose scale machine_service=5` to increase the number of containers to
5 for the cluster.
