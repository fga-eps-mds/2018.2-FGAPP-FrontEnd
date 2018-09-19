default:
	make build $(IP)
	make run

build:
	python get-ip-address.py $(IP)
	docker-compose up -d

run:
	docker-compose exec front bash -c "yarn; bash"

down:
	docker-compose down

stop:
	make down
