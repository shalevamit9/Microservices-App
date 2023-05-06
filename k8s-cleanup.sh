helm un kibana
helm un logstash
helm un elasticsearch

kubectl delete \
-f k8s/config-map.yaml \
-f k8s/api-gateway-service.yaml \
-f k8s/user-service.yaml \
-f k8s/email-service.yaml
-f k8s/kafka.yaml \
-f k8s/zookeeper.yaml
