#!/usr/bin/env bash

current_deploy_folder=$STACK_BASE/releases/`cd $STACK_BASE/releases && ls -t | head -n1`
deploy_node_modules=$current_deploy_folder/node_modules
shared_node_modules=$STACK_BASE/shared/node_modules

set -x

mkdir -p $shared_node_modules
ln -s $shared_node_modules $deploy_node_modules
npm install --no-color --no-spin --production --prefix=$current_deploy_folder
sudo chown -R nginx: $current_deploy_folder # Not sure why this is needed
mkdir -p public/assets
webpack -p --config $current_deploy_folder/webpack.config.js
