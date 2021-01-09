#!/bin/bash -eu

ssh -l $DEPLOY_USER $DEPLOY_HOST mkdir -p $DEPLOY_TO
rsync -az --delete --progress --rsh="ssh -l $DEPLOY_USER" $DEPLOY_FROM $DEPLOY_HOST:$DEPLOY_TO

