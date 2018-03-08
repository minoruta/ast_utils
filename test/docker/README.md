# Development with docker

## Develop and Test
- open a terminal as #1
    - `docker-compose build`
    - `docker-compose up`
- open a terminal as #2
    - `docker exec -it tester ash`
    - `cd ast_utils`
    - `npm install`
    - `npm test`
