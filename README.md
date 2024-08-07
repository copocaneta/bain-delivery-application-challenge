# Bain Challenge - Thiago Bernardi

## Questions

**Question #1**

> 1. Tell us what pieces of software you think are necessary to develop for the working prototype and how they are related. We call each application (web, mobile or desktop), each API, each batch process that can be deployed independently a piece of software. Support yourself with a diagram if you think necessary.

**Answer**

-   For the working prototype, fewer services will be more manageable. The necessary pieces of software include:

    -   API Gateway: Single entry point for all requests.
    -   Customer Service: Manages customer data and interactions
    -   Restaurant Service: Manages restaurant registers and data.
    -   Delivery Driver Service: Manages the delivery drivers registrations and data
    -   Menu Service: Manages menus from restaurants.
    -   Location Service: Manages customer and delivery drivers location.
    -   Order Service: Manages order placement and processing
    -   Relational Database: Stores customer, order information, menu and restaurant data.
    -   Non-Relation Database: Serves Geospatial data to support Location Service.
    -   Frontend Application: Web and mobile interfaces for customers and delivery partners.

-   These components handle the basic requirements of placing orders and managing deliveries. For a final production version, I think we could expand to include aditional services such as elastic search, discount service, pricing service, and 'Change Data Capture' along with Kafka for event streaming.

    <img width="862" alt="Screenshot 2024-08-07 at 14 00 04" src="https://github.com/user-attachments/assets/dfb39073-702a-4a1e-bd9f-2546c55e3fe2">



**Question #2**

> 2. Tell us about the type of architecture you chose for question (1). Monolithic? Micro-services? Any intermediate? Other? Comment on what you based to make this decision.

**Answer**

-   For the prototype, I recommend a simplfied microservices architecture. This approach offers flexibility and scalability while keeping the system manageable which is important for a small team and a initial working prototype job. By starting with fewer services, we ensure quicker development and easier testing. As the prototype grows and gets traction, additional services can be incrementally added but obvious this would have to be based on the results we see and feedback we receive.

**Question #3**

> 3. Describe the work methodology you would use for development. It can be some known methodology (Scrum, XP, RUP), an adaptation, or a mixture between several methodologies. Whatever your experience has shown you works. Tell us why you think this form is appropriate for our problem.

**Answer**

-   I would use the Scrum methodology, which consists of iterative development and continuous feedback. Sprints of 2 weeks allow for regular reassessment and adptation. Daily standups ensure team alignment, while sprint reviews and retrospectives help improve process. This approach provides the flexibility needed for a prototype that requires quick adjustments based on testing results.

**Question #4**

> 4. Describe the workflow you would use to collaborate using Git. As with (3), you can use something familiar or an adaptation.

**Answer**

-   For Git workflow, I recommend the Gitflow workflow with three particular branches: main, development, and staging. The main branch contains production-ready code. The development branch integrates all feature branches and is used for ongoing development. The staging branch is for testing before production deployment, usually for a QA and stakeholders/client to test before we go live. We would enforce semantic commits for clarity and consistency. Small pull requests (PRs) ensure thorough code reviews and maintain high quality code. In my opinion this workflow ensures stability, supports iterative development, and facilitates efficient collaboration.

**Question #5**

> 5. Do you think it is necessary to add any extra member to the team during the development of the prototype? What would your role be? Do you think it would be necessary to add new members after the prototype phase? When and why?

**Answer**

-   For the prototype phase, the current team is enough, however, I am always inclined to say that a QA Engineer can ensure good testing and quality assurance. A Solutions Architect could also be valuable for designing scalable and efficient system architecture later, this will allow us to make strategic technology decisions, and ensure all components integrate smoothly. Also, aftetr the prototype phase, additional backend/frontend developers and a product manager might be necessry to handle increased workload and features. I think this would prepare the team for a seamless transition from prototype to production.

**Question #6**

> 6. What other considerations would you have to make the development process robust and efficient?

**Answer**

-   I would enforce automated testing to ensure code quality and reduce manual effort using the [Testing Trophey](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) approach ensuring we have unit, integration and e2e tests in place. Use CI/CD pipelines for automated build, test, and deployment processes, ti ensure faster releases. Robust monitoring and logging to help detect and diagnose issues early, this could be with Sentry and Prometheus. We would also obviosly follow security best practices, including data encryption and secure authentication mechanisms, to maintain high development standards. And last but not least, documentation, lots of documentation.

## Coding Part

This project is a Distance Calculator. It was built with NextJS with all the API routes built into it. It calculates the distance between two addresses using both the Haversine formula to get the **_as the crow flies_** distance and the Open Source Routing Machine (OSRM) API to get the **_distance by land transport_**. The results are saved in a SQLite database. The application is containerized with Docker for easy deployment. The web app uses a SQLite database on development and a PostgreSQL database from Vercel on "production" (on Vercel servers).

URL for online web app: [https://bain-delivery-application-challenge.vercel.app/](https://bain-delivery-application-challenge.vercel.app/)

### Features

-   Calculating As the Crow Flies Distance:
    The application calculates the as the crow flies distance using the Haversine formula. This formula determines the shortest distance between two points on a sphere, measured along the surface of the sphere. For more information, you can refer to the [Wikipedia article on the Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula). Credit for Harversine formula implementation on JavaScript [question on StackOverflow](https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript)..

-   Calculating By Land Transport Distance:
    The application also calculates the distance by land transport using the OSRM (Open Source Routing Machine) API. OSRM is a high-performance routing engine that computes shortest paths in road networks. It is designed for use in interactive web applications, providing near-instantaneous route calculations. For more information, visit the [OSRM project website](http://project-osrm.org/).

-   Saved Results:

    The URL http://localhost:3000/saved-results lists the saved data with the following columns:

    -   Source Address
    -   Destination Address
    -   Distance

### Prerequisites

-   Node.js (version 18 or higher)
-   Docker (if you choose to run the project with Docker)

### Project Setup

#### Without Docker

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

#### With Docker

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

### Project Structure

-   `/app`: Contains the Next.js application code and pages.
-   `/components`: Reusable React components.
-   `/config`: Configuration files.
-   `/scripts`: Scripts for initializing the database.
-   `/public`: Static assets.

### Notes

-   The `.dockerignore` file ensures that the development database and unnecessary files are not included in the Docker image.
-   The `Dockerfile` is configured to build the production version of the application and ensure the SQLite database is initialized.
-   The application uses the Nominatim API to fetch coordinates for addresses.

### Demo

https://github.com/user-attachments/assets/f229020f-7f29-4ab1-89b1-8299bbe1b30f


