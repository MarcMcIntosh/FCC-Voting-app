#!/usr/bin/bash
if [ ! -f .env ]; then
  echo "Createing .env file and appeding session key";
  echo "SESS_KEY=\"$(cat /proc/sys/kernel/random/uuid)\"" > .env ;
elif [ -z $(grep "SESS_KEY" ".env") ]; then
  echo "Appending session key to .env file";
  echo "SESS_KEY=\"$(cat /proc/sys/kernel/random/uuid)\"" >> .env ;
else 
  echo "session key already set in .env";
fi
