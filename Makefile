run:
	docker run \
	--rm -d --name giga \
	--network darknet \
	-v repo:/home/geos/nodejs/staticserver/repo \
	-e REPO=/repo \
	-e SERVER_PORT=3001 \
	-p 3001:3001 \
	foo
stop:
	docker stop -t 0 giga