#__NodeJS with typescript in dev__

##__Commands__

###- yarn
###- yarn add express
###- yarn add typescript -D
###- yarn tsc --init
####- > Change 'rootDir' from tsconfig.json to './src'
####- > Change 'outDir' from tsconfig.json to './dist'

##__Help__
...
###- We do not need to use the command 'yarn tsc' all the time to generate js files, just add scripts in package.json
####-- > "dev-server": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts" -> To generate js scripts and watch any changes all the time
...