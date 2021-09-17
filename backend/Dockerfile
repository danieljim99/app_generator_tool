FROM denoland/deno:1.12.0

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY . .

RUN deno cache --reload deps.ts

RUN deno cache --relaod index.ts

EXPOSE 5000

RUN deno run --allow-read --allow-net index.ts

RUN chmod +x /usr/src/backend/docker-entrypoint.sh
ENTRYPOINT ["/usr/src/backend/docker-entrypoint.sh"]
