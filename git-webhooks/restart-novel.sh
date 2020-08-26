#! /bin/bash
echo server restarting...
basepath=$(cd `dirname $0`; pwd)
cd $basepath/../novel
git pull
pm2 restart novel
echo server restarted