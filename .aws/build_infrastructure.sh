#!/bin/bash
source ./utils.sh

set -e

########################
### NAMING ARGUMENTS ###
########################

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -r|--region)
    REGION="$2"
    shift # past argument
    ;;
    -e|--env)
    ENV="$2"
    shift # past argument
    ;;
    -p|--profile)
    PROFILE="$2"
    shift # past argument
    ;;
    -d|--domain)
    DOMAIN="$2"
    shift # past argument
    ;;
    -pu|--prefix-url)
    PREFIX_URL="$2"
    shift # past argument
    ;;
    -acmc|--acm-arn)
    ACM_ARN="$2"
    shift # past argument
    ;;
    *)
    printf "***************************\n"
    printf "* Error: Invalid argument.*\n"
    printf "***************************\n"
    exit 1
esac
shift # past argument or value
done

# We check if AWS Cli profile is in parameters to set env var
if [ -z "$PROFILE" ]
then
    echo "Profile parameter is empty, the default profile will be used !"
else
    export AWS_PROFILE=${PROFILE}
fi

## Build Public
PUBLIC_URL=${PREFIX_URL}.${DOMAIN}

## S3
aws cloudformation deploy \
  --stack-name symeo-webapp-s3-${ENV} \
  --template-file cloudformation/s3.yml \
  --parameter-overrides \
      Env=${ENV} \
  --region ${REGION} \
  --no-fail-on-empty-changeset

export_stack_outputs symeo-webapp-s3-${ENV} ${REGION}

## Cloudfront
aws cloudformation deploy \
  --stack-name symeo-webapp-cloudfront-${ENV} \
  --template-file cloudformation/cloudfront.yml \
  --parameter-overrides \
      Env=${ENV} \
      S3Bucket=${FrontS3Bucket} \
      CertificateArn=${ACM_ARN} \
      PublicAlias=${PUBLIC_URL} \
  --region ${REGION} \
  --no-fail-on-empty-changeset

export_stack_outputs symeo-webapp-cloudfront-${ENV} ${REGION}

echo "DONE"
