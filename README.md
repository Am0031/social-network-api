# social-network-api

![MIT](https://img.shields.io/badge/License-MIT-blue)

## Summary of the project and links

This project is about building the backend of a social network app, configuring a working Express server and using a MongoDB database, and using mongoose for models and queries.

Github repo: [Go to Repo](https://github.com/Am0031/social-network-api/tree/dev)
Demo video: [Go to Demo video]()

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies](#technologies)
- [Main logic of the application](#main-logic-of-the-application)
- [Installation](#installation)
- [Demo video](#demo-video-of-the-application)
- [Contact me](#contact-me)

## About the project

### User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

### Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Postman for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Postman
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Postman
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Technologies

For this project, the following technologies and packages were used:

- Node.js v18.2.0 and NPM v8.9.0
- Node external packages:

  - "[dotenv](https://www.npmjs.com/package/dotenv)": "^16.0.1",
  - "[express](https://www.npmjs.com/package/express)": "^4.18.1",
  - "[mongoose](https://www.npmjs.com/package/mongoose)": "^6.5.0",
  - "[date-fns](https://www.npmjs.com/package/date-fns)": "^2.29.1"

- Development packages:
  - "[nodemon](https://www.npmjs.com/package/nodemon)": "^2.0.19",
  - "[@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)": "^7.3.0"

For testing of the API calls: Postman.
You can see the Postman collection of requests by uploading [this file]() into your postman application and testing these requests.

## Main logic of the application

### Database Models

Our database contains the following models (documents), including the requirements listed for each model:

- `User`: contains the fields `username` and `email`, and the collections of documents:

  - `thoughts` : refers to the Thought model and contains the \_id field of the corresponding thoughts
  - `friends` : refers to the User model and contains the \_id field of the corresponding users

- `Thought`: contains the fields `thoughtText`, `username` and `createdAt`, and the collection of document:

  - `reactions`: refers to the Reaction model and contains the \_id field of the corresponding reactions

- `Reaction`: contains the fields `reactionBody`, `reactionId`, `username` and `createdAt`.

As per mongodb's data structure, all documents also include a `_id` field, unique and sequential, and generated upon creation of the document.

### Virtuals

In addition to the above fields, the following virtuals are set up:

- `friendsCount`: in the User model, to track the number of documents in the collection `friends` for each user
- `thoughtCount`: in the User model, to track the number of documents in the collection `thoughts` for each user
- `reactionCount`: in the Thought model, to track the number of documents in the collection `reactions` for each thought

### Server routes

Our server routes to our various end points are:
![Routes]()

## Installation

To get this project installed, the following steps are required:

Clone the repository, using SSH keys:

```
git clone git@github.com:Am0031/social-network-api.git
```

Or using HTTPS link:

```
git clone https://github.com/Am0031social-network-api.git
```

Go into the new repository and install the required packages:

```
cd social-network-api
npm install
```

Once installed, to get this project running, the following steps must be followed:

Step 1: Set the environment variables

In the root folder, create a .env file. Copy the content from the .env.sample file into your newly created .env file and complete each line as per the below guidance:

```
DB_NAME= "socialdb"
```

Step 2: Database setup

Make sure MongoDB is installed on your machine and that the app is in the "running" state.
To create the mongodb database and seed information into it, in the root level in VS code, open an integrated terminal and enter the instruction below and press enter:

```
npm run seed
```

You can check your database has been successfully created by using mongodb compass. After connecting the string, you should see your database in the list of local databases available and you can see all its collections when clicking on it.

Step 3: Start the application

Still in your integrated terminal, to run your server, enter the instruction below and press enter:

```
npm run start
```

Step 4: Run the Postman collection

Once your server is up and running, open Postman and upload the postman collection file.
Once successfully uploaded, you will see folders representing different workflows. These folders can be run independently, or you can run the complete collection, to check that all end points work.
When running a folder or a complete collection, it's important to keep in mind that tests are executed in the order in which they appear in the list, and variables are cascaded down in that order.

## Demo video of the application

This video shows how to set up the application and how to test the end points using Postman and MongoDb Compass.
Please click [here]() to open the video.

## Contact me

If you have any questions about this application, feel free to get in touch by sending me an [email](mailto:amelie.pira@gmail.com).
