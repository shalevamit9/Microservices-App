pod_id=$1

kubectl exec --stdin --tty $pod_id -- sh
