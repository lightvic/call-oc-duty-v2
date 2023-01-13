BACK_PATH:=back/app
FRONT_PATH:=front
FRONT_PATH:=front
DOCKER_COMPOSE:=docker compose
UP:=up -d --build
DOWN:=stop
FRONT_NAME:=front_ops
BACK_NAME:=back_ops
DB_NAME:=database_ops
EXEC:=docker exec
OS=mac
OS=mac

install: start
ifeq (${OS}, mac)
	${EXEC} ${BACK_NAME} composer install
	${EXEC} ${FRONT_NAME} npm install
else ifeq (${OS}, win)
	cd ${FRONT_PATH}/client && npm install
	${EXEC} ${BACK_NAME} composer install
endif

start:
ifeq (${OS}, mac)
	cd ${BACK_PATH} && ${DOCKER_COMPOSE} ${UP} && cd ../../${FRONT_PATH} && ${DOCKER_COMPOSE} ${UP}
else ifeq (${OS}, win)
	cd ${BACK_PATH} && ${DOCKER_COMPOSE} ${UP} && cd ../../${FRONT_PATH}/client && npm run start
endif

stop:
ifeq (${OS}, mac)
	cd ${BACK_PATH} && ${DOCKER_COMPOSE} ${DOWN} && cd ../../${FRONT_PATH} && ${DOCKER_COMPOSE} ${DOWN}
else ifeq (${OS}, win)
	cd ${BACK_PATH} && ${DOCKER_COMPOSE} ${DOWN} && cd ../../${FRONT_PATH}/client && npm stop
endif

bash: start
	${EXEC} -ti ${DB_NAME} bash
