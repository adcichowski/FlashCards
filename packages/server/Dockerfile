FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB flashcards
COPY migration.sql /docker-entrypoint-initdb.d/
