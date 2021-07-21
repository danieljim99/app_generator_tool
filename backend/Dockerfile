FROM denoland/deno:1.12.0

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY . .

RUN deno cache deps.ts

RUN deno cache index.ts

EXPOSE 5000

RUN chmod +x /usr/src/backend/docker-entrypoint.sh
ENTRYPOINT ["/usr/src/backend/docker-entrypoint.sh"]
