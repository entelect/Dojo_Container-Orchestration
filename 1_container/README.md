# Containers

This directory contains a simple container example by starting a nodejs server
that can listen to simple web requests.

## Building

To build the Docker Image, just run `docker build . -t webserver`. This will
create a new image called _webserver_.

## Running

In order to run the image as a container, you will just need to run the following
command `docker run -it -p 8080:8080 webserver`. Then open your favourite web
browser and go to localhost:8080. You should see that the node webserver returns
a web page. The flags *-p* indicates what port you should expose on the local
machine to the docker network. The *-it* indicates that the container should run
in a interactive mode with a TTY. 

## Additional Information

The following commands will be helpful for managing the container...

* docker stop <container_name/container_id>: Will stop the container from running
* docker start <container_name/container_id>: Starts the container
* docker ps -a: Lists the currently running containers
* docker images: Lists the currently available images for containers
