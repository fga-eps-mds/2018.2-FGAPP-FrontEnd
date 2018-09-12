default:
	make build
	make run

run:
	python get-ip-address.py
	docker run -it --rm -p 19000:19000 -p 19001:19001 -v "${PWD}:/app" --env-file .env react-app:integra bash -c "yarn install; bash"

build:
	docker build . -t react-app:integra

rebuild:
	make build --no-cache
