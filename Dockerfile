FROM node:14-alpine as build-step

RUN mkdir -p /home/angular

WORKDIR /home/angular/app

COPY ./app .

RUN npm install

RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /home/angular/app/build /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 3003

