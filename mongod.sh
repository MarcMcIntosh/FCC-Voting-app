if [ ! -d data ]; then
  mkdir data
fi
mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"
