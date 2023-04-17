helm un kibana
helm un logstash
helm un elasticsearch

kubectl delete \
-f k8s/config-map.yaml \
-f k8s/api-gateway-service.yaml \
-f k8s/user-service.yaml \
