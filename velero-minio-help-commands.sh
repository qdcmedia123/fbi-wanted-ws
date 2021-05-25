# Pull the docker 
docker pull minio/minio

# Run the docker with the data location should be saved to 
docker run --name minio -p 9000:9000 -v data:/data minio/minio server /data

# Find the secret keys 
cat data/.minio.sys/config/config.json

 ,"credentials":{"_":[{"key":"access_key","value":"minioadmin"},{"key":"secret_key","value":"minioadmin"}]},

# Rund the docker 
 docker run -p 9000:9000 minio/minio server /data

# Save minio cred somewhere 
nano minio.credentials
# pest the following code 
[default]
aws_access_key_id=minioadmin
aws_secret_acess_key=minioadmin

# Install velero in kubernetes cluster
# --provider aws

 velero install \
  --provider velero.io/aws \
  --bucket kubedemo \
  --plugins velero/velero-plugin-for-aws:v1.0.0 \
  --secret-file ./minio.credentials \
  --backup-location-config region=minio,s3ForcePathStyle=true,s3Url=http://192.168.15.170:9000

# I did mistake here my 172 is docker ip address not my local computer ip address 
# You need to put your local computer ip addrees 192.168.15.170:9000

# Below is just an example copied from the digital ocean 
  velero install \
  --provider velero.io/aws \
  --bucket kubedemo \
  --plugins velero/velero-plugin-for-aws:v1.0.0,digitalocean/velero-plugin:v1.0.0 \
  --backup-location-config s3Url=https://nyc3.digitaloceanspaces.com,region=nyc3 \
  --use-volume-snapshots=false \
  --secret-file ./examples/cloud-credentials


# get where were are saving our backup
velero backup-location get

# Velero get backup
velero backup get

# Creating namespace in kubernetes 
kubectl create ns testing

# run nginx in testing replicas replicas is depreciated 
kubectl -n testing run nginx --image nginx --replicas 2

# get all pods inside testing namespace 
kubectl -n testing get all

# Get backup
kubectl get backups

# Custom resource deployed when we apply velero to our kubernetes cluster
kubectl -n velero get crds 

# get backup
velero backup get

# I want to backup testing nampespace not everything 
velero backup create secoubackup --include-namespaces testing

## Config 
--exclude-resources configmap

# Get you backup
kubectl -n velero get backups

# Backup failed then use following commong 
velero backup logs [firstbackup]

# Describe 
velero backup describe secoundbackup