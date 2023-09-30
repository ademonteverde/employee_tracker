# Employee Tracker

This is an Employee Management System command-line application that allows you to manage departments, roles, and employees within a company. It provides features such as viewing existing data, adding new departments, roles, and employees, and updating employee roles.

## Prerequisites

- Node.js and npm installed on your computer.
- MySQL server installed and running.

## Setup

1. Clone this repository to your local machine:
```
git clone git@github.com:ademonteverde/employee_tracker.git
```
2. Install dependencies:
```
npm install
```
3. Set up your MySQL database by executing the SQL schema and seeds provided in the db folder:
```
-u your_username -p
source path\to\schema.sql   
source path\to\seeds.sql 
```
4. Create a .env file in the project root and add your MySQL database credentials:
```
DB_USER = "your_username"
DB_PASSWORD = "your_password"

```

## Usage
To run the application, use the following command:
```
npm start
```
## Assets
The following image demonstrates the web application's appearance and functionality:

![Example of Note Taker Homepage](./images/employee_tracker_demo1.png)

![Example of Note Taker App](./images/employee_tracker_demo2.png)

## Link to GitHub Repository:

[https://github.com/ademonteverde/employee_tracker](https://github.com/ademonteverde/employee_tracker)

## Link to deployed application:

[https://ademonteverde.github.io/employee_tracker/](https://ademonteverde.github.io/employee_tracker/)

## License

This project is licensed under the [MIT](https://github.com/ademonteverde/employee_tracker/blob/main/LICENSE) License.