helm install elasticsearch K8s/helm/elasticsearch/
helm install logstash K8s/helm/logstash/
helm install kibana K8s/helm/kibana/

kubectl apply \
-f K8s/config-map.yaml \
-f K8s/api-gateway-service.yaml \
-f K8s/user-service.yaml \
