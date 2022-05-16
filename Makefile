init:
	cd server; \
	npm run typeorm:migration:run;

seed:
	cd server; \
    npm run db:seed;

launch-server:
	cd server; \
	npm install; \
	npm run start:dev

start-client:
	cd client; \
	npm install; \
	PORT=5000 npm start

start-server: init seed launch-server
