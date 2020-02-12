# sc-event-topic-generator-front-end

A tool for generating messages with a probabilistic topic generator based on a schema description. The default schema generates fictitious messages for the SFMTA. 

To create your own schema, update the file src/scripts/transportJson.js


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Docker

A multi-stage docker build that first builds the production version, then sticks it in a custom configured nginx container.

```
./dockerBuild.sh
./dockerRun.sh
```

http://localhost:1234
