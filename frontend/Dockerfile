FROM denoland/deno:1.12.0

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

COPY . .

RUN deno run -A https://deno.land/x/aleph@v0.3.0-alpha.33/install.ts 0.3.0-alpha.33

RUN aleph dev

EXPOSE 8080

RUN chmod +x /usr/src/frontend/docker-entrypoint.sh
ENTRYPOINT ["/usr/src/frontend/docker-entrypoint.sh"]
