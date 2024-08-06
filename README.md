# Bain Challenge - Thiago Bernardi

This project is a Distance Calculator. It calculates the distance between two addresses using both the Haversine formula to get the **_as the crow flies_** distance and the Open Source Routing Machine (OSRM) API to get the **_distance by land transport_**. The results are saved in a SQLite database. The application is containerized with Docker for easy deployment.

## Features

-   Calculating As the Crow Flies Distance:
    The application calculates the as the crow flies distance using the Haversine formula. This formula determines the shortest distance between two points on a sphere, measured along the surface of the sphere. For more information, you can refer to the [Wikipedia article on the Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula).

-   Calculating By Land Transport Distance:
    The application also calculates the distance by land transport using the OSRM (Open Source Routing Machine) API. OSRM is a high-performance routing engine that computes shortest paths in road networks. It is designed for use in interactive web applications, providing near-instantaneous route calculations. For more information, visit the [OSRM project website](http://project-osrm.org/).

-   Saved Results:

    The URL http://localhost:3000/saved-results lists the saved data with the following columns:

    -   Source Address
    -   Destination Address
    -   Distance

## Prerequisites

-   Node.js (version 18 or higher)
-   Docker (if you choose to run the project with Docker)

## Project Setup

### Without Docker

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/bain-challenge-thiago-bernardi.git
    cd bain-challenge-thiago-bernardi
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Initialize the database

    ```bash
    node scripts/init-db.js
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

    - The application will be running at `http://localhost:3000`.

5. Build and run the production server

    ```bash
    npm run build
    npm run start
    ```

    - The production server will be running at `http://localhost:3000`.

### With Docker

1. Build the Docker image

    ```bash
    docker build -t bain_challenge_thiago-bernardi --no-cache .
    ```

2. Run the Docker container

    ```bash
    docker run --name bain_challenge_container -p 3000:3000 -d bain_challenge_thiago-bernardi
    ```

    - The application will be running at `http://localhost:3000`.

3. Stop and remove the Docker container (optional)

    - To stop the container:

    ```bash
    docker stop bain_challenge_container
    ```

    - To remove the container:

    ```bash
    docker rm bain_challenge_container
    ```

4. View logs of the Docker container:

    ```bash
    docker logs bain_challenge_container
    ```

## Project Structure

-   `/app`: Contains the Next.js application code and pages.
-   `/components`: Reusable React components.
-   `/config`: Configuration files.
-   `/scripts`: Scripts for initializing the database.
-   `/public`: Static assets.

## Notes

-   The `.dockerignore` file ensures that the development database and unnecessary files are not included in the Docker image.
-   The `Dockerfile` is configured to build the production version of the application and ensure the SQLite database is initialized.
-   The application uses the Nominatim API to fetch coordinates for addresses.
