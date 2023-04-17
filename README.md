# Microservices App

To run k8s environment:
- Make sure to have a k8s cluster running (I recommend Docker Desktop k8s cluster)
- build services images
- run k8s-startup.sh shell script

For Testing purposes you can expose a pod using port forwarding:
```bash
kubectl port-forward {POD_ID} {LOCAL_PORT}:{POD_PORT}
```

An example of port forward to an elasticsearch pod.
Given an elasticsearch pod named elasticsearch-master-0 that listens to port 9200 execute the following:

```bash
kubectl port-forward elasticsearch-master-0 9200:9200
```