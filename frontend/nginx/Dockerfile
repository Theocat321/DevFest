FROM nginx:1.19.0

WORKDIR /usr/share/nginx/html
COPY dist/frontend .
RUN chown -R nginx:nginx .
RUN chmod -R 700 .
RUN rm /etc/nginx/conf.d/default.conf

COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
