default:
	make build $(IP)

build:
	python get-ip-address.py $(IP)
	docker-compose up

run:
	docker-compose exec front bash

down:
	docker-compose down

stop:
	make down
