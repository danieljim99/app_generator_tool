FROM hayd/ubuntu-deno:1.5.2

RUN mkdir -p /usr/src/app_generator
WORKDIR /usr/src/app_generator

COPY . .

RUN deno cache deps.ts

RUN deno cache index.ts

EXPOSE 5000

RUN chmod +x /usr/src/app_generator/docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app_generator/docker-entrypoint.sh"]
