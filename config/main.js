module.exports = {
  'secret': 'no much secret', // Secret for JWT tokens
  'database':'mongodb://admin:admin123@cluster0-shard-00-00-ixdv9.mongodb.net:27017,cluster0-shard-00-01-ixdv9.mongodb.net:27017,cluster0-shard-00-02-ixdv9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', //Local DB connection
  'port': process.env.PORT || 3000 ,//PORT number setting
  'dev':false
}
