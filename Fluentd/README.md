# Fluentd

[Fluentd](https://www.fluentd.org/) collects events from various data sources and writes them to files, RDBMS, NoSQL, IaaS, SaaS, Hadoop and so on. Fluentd helps you unify your logging infrastructure (Learn more about the [Unified Logging Layer](https://www.fluentd.org/blog/unified-logging-layer)).

<p align="center">
<img src="https://www.fluentd.org/images/fluentd-architecture.png" width="500px"/>
</p>

An event consists of *tag*, *time* and *record*. Tag is a string separated with '.' (e.g. myapp.access). It is used to categorize events. Time is a UNIX time recorded at occurrence of an event. Record is a JSON object.

## Example Use Cases

Use Case | Description | Diagram
-------- | ------------|:---------:
Centralizing Apache/Nginx Server Logs | Fluentd can be used to tail access/error logs and transport them reliably to remote systems. | <img src="https://www.fluentd.org/images/recipes/elasticsearch-s3-fluentd.png" height="150"/>
Syslog Alerting | Fluentd can "grep" for events and send out alerts. | <img src="https://www.fluentd.org/images/syslog-fluentd-alert.png" height="100"/>
Mobile/Web Application Logging | Fluentd can function as middleware to enable asynchronous, scalable logging for user action events. | <img src="https://www.fluentd.org/images/datasources/asynchronous_logging.png" height="150"/>

### Helm Release installation using the Fluentd Helm chart
Prerequisites:

  - Docker Engine and Docker daemon running
  - Helm client (preferrably Helm v3)
  - Active/Running Kubernetes cluster
  - Internet connection

Open your terminal and enter these commands:<br />
**helm repo add bitnami https://charts.bitnami.com/bitnami**<br />
**helm install *my-release* bitnami/fluentd**<br />

See your active Helm releases by entering the command **helm list -a**<br />
See your Kubernetes deployments by entering the command **kubectl get all**<br />

### Links

Fluentd: https://www.fluentd.org/<br/>
Fluentd GitHub repository: https://github.com/fluent/fluentd/<br />
Stable Fluentd Helm Chart: https://github.com/fluent/helm-charts<br /><br />
Docker Desktop: https://www.docker.com/products/docker-desktop<br />
Docker: https://www.docker.com/<br />
Helm: https://helm.sh/<br />
Kubernetes: https://kubernetes.io/<br />