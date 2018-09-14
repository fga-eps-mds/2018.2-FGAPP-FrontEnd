# Integra APP
An application developed by university students, for university students.

## Requirements
This projects needs some requirements that need to be downloaded.

* **Expo**  [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR) - [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) - Installed in your own device.
* **Docker**  [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/) - [MacOS/Win](https://www.docker.com/products/docker-desktop) - Used to Configure the environment
* [Python](https://www.python.org/) - To get ip by script and optimize QR Code reading on Docker container


## Development
The project is setup with Docker. running ***make*** will install and build the project and dependencies. This step depends of internet bandwith and cpu, maybe last around 5 minutes to download all dependencies for development, but after downloaded make will be much faster. 

```shell
make build
```

After installing dependencies and the container presents ***done***. Execute this following command to enter inside the docker.

```shell
make run
```

to get the containers down
```shell
make down
```

Inside docker's container, execute ***yarn start*** to run the react-native app. Then just get your camera and point to the QR Code on the terminal, this will launch Expo app in your device and build the project.

```shell
yarn start
```
