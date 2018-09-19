default:
	docker build . -t server-mock
	docker run --rm -p 8081:8081 -v `pwd`:"/app" -w "/app" -it server-mock bash -c "cd mock; npm install --save; bash"