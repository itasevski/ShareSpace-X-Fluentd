# ShareSpace X Fluentd
This project comprises two subprojects and the main idea is to implement various concepts of today's modern DevOps Continuous Integration/Continuous Development technologies and see what that branch has to offer software engineers and other developers.

## Technologies
The DevOps tools/technologies used are the following:

 - Git/GitHub
 - Docker, Docker-compose
 - GitHub Actions CI/CD pipeline
 - Helm & Kubernetes

For more info about the two subprojects, read their README.md files in their respected subdirectories.

## Workflow
I have Docker Desktop installed with an active local single-node Kubernetes cluster enabled (made available by Docker Desktop).

After booting up all the docker containers and building all the neccessary images for my ShareSpace apps, I used Helm charts to create releases and deploy them to my local Kubernetes cluster. These charts can be viewed in the charts subdirectory in the root directory of this repository.

Since there is a stable Helm chart for Fluentd, I added a Bitnami repo locally and from there used Fluentd's Helm chart to install a new release in Kubernetes.

For the CI/CD pipeline, since I'm working with GitHub, I went with GitHub Actions, as a very efficient pipeline implementation that makes automation easier significantly.

My CI/CD pipeline consists of 6 jobs:

 - The first two jobs build the Docker images for my Spring Boot and React applications of the ShareSpace project. After that, they push those newly created images to Docker Hub.
 - The third and fourth jobs depend on the first two jobs and their purpose is to use those newly-pushed images to install or upgrade the Helm releases in my local Kubernetes cluster.
     > These jobs depend on the first two because it's best practise to use most recent Docker images. The job that installs the Helm release for the Spring Boot app also depends on the fifth job (The PostgreSQL pod creation and deployment) since the Spring Boot app is configured to connect to a PostgreSQL database at runtime.
     
	 > In order for the machine to connect to my local Kubernetes cluster, I used **Ngrok** to open a public web server which tunnels/forwards incoming requests to localhost (127.0.0.1), to an exposed port of the Kubernetes cluster that I earlier exposed using the *kubectl proxy* command. Therefore, the Ubuntu machine sends requests to the public Ngrok web server which then tunnels/forwards those requests to the exposed local Kubernetes cluster port.
This connection configuration is available in the **KUBECONFIG** secret added to this repository. 
	 
- The fifth job creates a PostgreSQL database Pod configuration and deploys it to Kubernetes.
- The sixth job adds the Bitnami repo (if it is not already added) and installs or upgrades the Fluentd Helm release in Kubernetes.

### Links

Docker Desktop: https://www.docker.com/products/docker-desktop<br />
Docker: https://www.docker.com/<br />
Helm: https://helm.sh/<br />
Kubernetes: https://kubernetes.io/<br />
Ngrok: https://ngrok.com/<br />



