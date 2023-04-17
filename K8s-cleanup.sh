helm un kibana
helm un logstash
helm un elasticsearch

kubectl delete \
-f K8s/config-map.yaml \
-f K8s/api-gateway-service.yaml \
-f K8s/user-service.yaml \
