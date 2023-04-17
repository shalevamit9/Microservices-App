helm install elasticsearch k8s/helm/elasticsearch/
helm install logstash k8s/helm/logstash/
helm install kibana k8s/helm/kibana/

kubectl apply \
-f k8s/config-map.yaml \
-f k8s/api-gateway-service.yaml \
-f k8s/user-service.yaml \
