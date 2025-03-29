# Flight Search App

This application uses Amadeus API to search for flights!

## Getting started

1. Clone this repository

Using HTTP:

```bash
git clone https://github.com/DeimosHall/flight-search.git
```

Using SSH:

```bash
git clone git@github.com:DeimosHall/flight-search.git
```

2. Move to the project directory:

```bash
cd flight-search
```

3. Run the project using Docker

For testing without development enviroment, no Java or NodeJS is required to be installed on your system:

```bash
docker-compose up
```

For development:

```bash
cd backend && ./gradlew build && cd .. && docker-compose up --build
```

4. Test the app on your browser, go to http://localhost:8080/
