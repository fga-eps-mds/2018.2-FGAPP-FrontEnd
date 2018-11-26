default:
	python get-ip-address.py $(IP)
	make build
	make run $(IP)

build:
	docker-compose build

run:
	cp mobile/config/app-development.json mobile/app.json
	python get-ip-address.py $(IP)
	docker-compose up -d
	docker-compose exec front bash -c "yarn; bash"

down:
	docker-compose down

stop:
	make down
