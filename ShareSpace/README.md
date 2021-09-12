# ShareSpace

ShareSpace is a system where people can interact and share public transport expenses. This repository contains its source code.

### Setting up the application

1. Make sure you have a PostgreSQL server installed locally or a Docker container with a PostgreSQL server image running. After that, edit the application-sharespace.properties file with your information.
2. Add a Database source with information that corresponds to the information in the .properties file. Make sure you select a PostgreSQL DB source.
3. After this, start the application. The database and its related entities should be built by Hibernate during runtime.
4. To start the React application, first make sure port 3000 on your localhost is not being used by another service. After that, open your terminal, navigate to the "ShareSpace/sharespace-frontend" directory and enter the command "npm start". The development server will start and your default browser will open automatically.

### Alternate setup (with Docker-compose)
Prerequisites:
 
- Docker Engine and Docker daemon running, along with the docker-compose tool. 
   > If you have Docker Desktop installed, you already have docker-compose installed. Make sure to check if you have it installed first. Otherwise, install it.
- Internet connection
<br />

1. Open your terminal and navigate to the "ShareSpace/src/main/docker" directory.
2. Enter the command **docker-compose up**. 
   > This command will create the mandatory images and use them to boot up all the required docker containers.
3. Wait until the apps have successfully started and then navigate to http://localhost:3001.

<br />
To avoid referential integrity violations, open the database console in your editor/IDE and paste the SQL code given in "ShareSpace/project-material/SQL-backup-script.txt". After that, select the code and run it in the console.
<br />

Additional usage guides are available in the "About" section of the web application.

For the application's Geocoding/Geolocation services, you can use my API key that is available and is already configured in the application.

#### Helm Release installations using the ShareSpace Helm charts
Prerequisites:

  - Docker Engine and Docker daemon running
  - Helm client (preferrably Helm v3)
  - Active/Running Kubernetes cluster
  - Internet connection

Open your terminal, navigate to the root directory and enter these commands:<br />
**helm install *sharespace-spring-boot-release* charts/sharespace-backend**<br />
**helm install *sharespace-react-release* charts/sharespace-frontend**<br />
**kubectl apply -f *sharespace-postgresql-deployment* kubernetes/sharespace-pgdb**<br />

See your active Helm releases by entering the command **helm list -a**<br />
See your Kubernetes deployments by entering the command **kubectl get all**<br />

#### Links
Original project GitHub repository: https://github.com/itasevski/ShareSpace

Spring Boot: https://spring.io/projects/spring-boot<br />
React: https://reactjs.org/<br />
PostgreSQL: https://www.postgresql.org/<br />
Docker Desktop: https://www.docker.com/products/docker-desktop<br />
Docker: https://www.docker.com/<br />
Helm: https://helm.sh/<br />
Kubernetes: https://kubernetes.io/<br />