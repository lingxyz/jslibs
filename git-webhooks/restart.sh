#! /bin/bash
echo server restarting...
basepath=$(cd `dirname $0`; pwd)
cd $basepath
git pull
pm2 restart webhook
echo server restarted