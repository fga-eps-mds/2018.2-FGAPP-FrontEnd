default:
	echo "\n message:\n---\nChanges were made on the image... please execute\nmake build\n---"
	make up $(IP)
	make run

up:
	python get-ip-address.py $(IP)
	docker-compose up -d

build:
	docker-compose build

run:
	docker-compose exec front bash -c "yarn; bash"

down:
	docker-compose down

stop:
	make down
