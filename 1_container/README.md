# Containers

This directory contains a simple container example that starts a nodejs server that can listen to simple web requests.
The idea of this example is to provide an example of how to define a Docker Image, build the Image from a Dockerfile
and finally how to start the Image as a Container.

## Definition

All Docker Images are defined by a Dockerfile, which will define which Base Image your Image will use. Depending on your
application your Base Image could be different from project to project. For example you may decide to use a stripped down
Base Image with just the OS libraries, such as Ubuntu or CentOS. You could also decide to use a Base Image that contains
the framework or libraries you require for your application, such as Node or Java.

Images built from a Dockerfile are very sensitive to the order that the commands are given. Each command in the 
Dockerfile will result in a new layer being generated on the final Docker Image. It means that making a change to
any command (or the command having a different result), will force all subsequent layers to be rebuilt. You can implement
optimizations in your Dockerfile by placing dynamic commands towards the end of the Dockerfile when possible.

## Building

To build the Docker Image, just run `docker build . -t webserver`. This will create a new image called _webserver_, as 
defined in the Dockerfile. If you want to move your Dockerfile then you will need to update the location of the new
Dockerfile, but be aware that a Dockerfile can not include any files located higher in the directory than where it is
located. For this reason I suggest putting Dockerfiles as high in your directory structure as possible. A Docker Image
name has a couple of components when naming them, which is as follows _<docker_registry>/<image_name>:<tag>_. By default
the _docker_registry_ will be Dockerhub and the _tag_ will be latest. Depending on how you want to manage your Images
you should tag each Image with appropriate versions, for example `docker build . -t webserver:1.0.0`. A Docker Image can
be shared between different tags if required, so you could run both commands above and when you look at your Images via
the `docker images` command, you will see both Images in the list. But they will both point to the same Image ID, meaning
that they are the same image. If you made changes to the server.js and built a new image with `docker build . -t webserver`
they will no longer be the same image and will have different Image Ids.

## Running

In order to run the image as a container, you will just need to run the following command 
```
docker run -it -p 8080:8080 webserver
```
Then open your favourite web browser and go to localhost:8080. You should see that the node webserver returns
a web page. The flags *-p* indicates what port you should expose on the local machine to the docker network. The *-it*
indicates that the container should run in a interactive mode with a TTY. In addition you can provide environment 
variables, volumes and many other configuration options when running docker commands.

## Optimization

Optimizing Dockerfiles can a huge challenge and can introduce many unexpected problems. In general the idea is to try
reduce the number of Layers that a Image composes of, by trying to fold RUN, COPY, ADD commands into a single command.
Additional optimizations can be made by not altering huge amounts of files during the Dockerfile stage, for example
changing ownership of files will introduce bloated layers. Finally using minimal base images such as _alpine_ based
images can also reduce the final Image size.

The problem with the above optimizations is that flattening commands, might cause longer builds, since if any of the 
commands fail the entire layer will be lost. Altering files during build might be unavoidable. Finally, using alpine
type images might require complicated additional Dockerfile installation steps to include required libraries.

## Additional Information

The following commands will be helpful for managing the container...

* docker stop <container_name/container_id>: Will stop the container from running
* docker start <container_name/container_id>: Starts the container
* docker ps -a: Lists the currently running containers
* docker images: Lists the currently available images for containers
