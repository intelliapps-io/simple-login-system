
# simple-login-system

## Technologies Used

|Server Side| Client Side | Docker |
|--|--|--|
|- TypeScript <br> - Express <br> - TypeORM <br> - TypeGraphQL <br> - Apollo Server <br> | - TypeScript <br> - React <br> - Apollo Client <br> - Antd (UI Library) <br> - GraphQL Generator| - Configured to Support: <br> - MySQL / PhpMyAdmin <br> - PostgreSQL / PGAdmin

## Get Started
 1. Install Packages 
	- `cd server` -> `npm i`
	- `cd client` -> `yarn`
 2. Start Docker
	- `cd server` -> `docker-compose up -d`
 3. Start Server & Client
	- `cd server` -> `npm run dev`
	- `cd client` -> `yarn start`
 4. Open Browser
	- Visit `localhost:3000`
	
## Folder Structure 
 - Client 
	 - **src** -> create react app
 - Server
	 - **src**
		 - **entity** -> typeorm data objects
		 - **helpers** -> common code
		 - **modules** -> graphql resolvers
		 - **ts** -> typescript types
