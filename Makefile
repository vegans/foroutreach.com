foo:
	echo foo

update:
	git pull
	docker-compose stop
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d