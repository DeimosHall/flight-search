# Flight Search App

This application uses Amadeus API to search for flights!

## Getting started

1. Clone this repository

Using HTTP:

```bash
git clone https://github.com/fran-tor/flight-search.git
```

Using SSH:

```bash
git clone git@github.com:fran-tor/flight-search.git
```

2. Move to the project directory:

```bash
cd flight-search
```

3. Setup you API KEYS

In order to be able to run the project, you need to provide your own API_KEY and API_SECRET. You can get them by creating an account in [Amadeus for developers](https://developers.amadeus.com/).

Use the following commands to setup your own variables:

```bash
export AMADEUS_API_KEY=your_api_key
```

```bash
export AMADEUS_API_SECRET=your_api_secret
```

4. Run the project using Docker

For testing without development enviroment, no Java or NodeJS are required to be installed on your system:

```bash
docker-compose up
```

For development you need to modify the backend dockerfile as follows:

```dockerfile
# Copy the build files from the previous stage for production
# COPY --from=build /app/build/libs/*.jar app.jar

# Copy the build files from the host to the container for development
COPY build/libs/*.jar app.jar
```

And then run the following command:

```bash
cd backend && ./gradlew build && cd .. && docker-compose up --build
```

5. Test the app on your browser, go to http://localhost:8080/
