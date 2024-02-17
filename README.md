
[![inquirer](https://img.shields.io/badge/inquirer-blue?style=for-the-badge&logo=npm&logoColor=white&labelColor=red)](https://www.npmjs.com/package/inquirer) [![node.js](https://img.shields.io/badge/Node.js-blue?style=for-the-badge&logo=Node.js&logoColor=white&labelColor=red)](https://nodejs.org/en) [![npm](https://img.shields.io/badge/npm-blue?style=for-the-badge&logo=npm&logoColor=white&labelColor=red)](https://www.npmjs.com/) [![mysql](https://img.shields.io/badge/mysql-blue?style=for-the-badge&logo=mysql&logoColor=white&labelColor=red)](https://www.mysql.com/)


<div align="right"> 
<a href= "http://www.wtfpl.net/about/"><img src = "https://img.shields.io/badge/License-WTFPL-brightgreen.svg"></a>
</div>

# Employee Tracker    

This app lets users to view and manage the departments, job roles, and employees of a given company.

##  Description

Through commandline interface, the users can view departmenst, add a new department, update and delete an exsisting department. Similarly, job roles and employes can be managed. 

By creating this project, I learnt to install the `Node.js` and the `npm`, and build and use `modules` which enable us to separate logically distinct part of the script into different scripting files. I also learnt to use various included packages in `node_modules` such as `chalk`, `figures`, `log-symbols`. I also learnt [`ANSI Escape Codes`](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797), which helps to change the style of console log text. I also learnt to design `MySql` database schema, populate relational data, and perform various `CRUD` queries.


## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Issues](#issues)
1. [Licence](#licence)
1. [Screenshots](#screenshots)
1. [Demo](#demo)


## Installation 

1. Download and Install the `Node.js` 
1. Install `NPM` by typing
    ```       
    npm init -y
    ```
1. Install `Inquirer`
    ```
    npm i inquirer@8.2.4
    ```
1. Install `Max Input Length` plugin
    ```
    npm i @matti-o7/inquirer-maxlength-input-prompt
    ```
1. Install `Dotenv` for saving password 
    ```
    npm i dotenv
    ```
1. Install `MySQL2` 
    ```
    npm i mysql2
    ```
1. Install `Console Table` for displaying query result
    ```
    npm i console.table
    ```
And the `package.json` file should look like below:              
![package.json](./assets/screenshots/package.png)

## Usage
- Change the .env.copy file to .env, and change your password and database name in the file
![env file](./assets/screenshots/env.png)     

- Navigate to `db`, and conect to databse by typing in `mysql -u root -p`, and type in password   
![Database connection](./assets/screenshots/connection.png)

- Again, navigate to `db`, and source `schema.sql` and `seeds.sql`
    ```
    source schema.sql;
    ```
    ```
    source seeds.sql;
    ```
   
## Issues
This app has some issue.          

1. The menu prompt should automatically display as soon as the result from the user's previous query has been displayed, but it doesn't. To get the prompt, the user must press the `↑` and `↓` keys.             
![Menu not reappering](./assets/screenshots/menu%20not%20appering.png)             

1. The section of the current menu prompt is rendered partially over the section of the previous prompt.                 
![Sections overlapping](./assets/screenshots/sections%20overlapping.png)        

1. Somehow the 0 for salary is not accepted as a number, or as a valid salary.              
![Salaray validation error](./assets/screenshots/validation%20error.png)      

## Licence

This app is licensed under [**WTFPL**](http://www.wtfpl.net/about/)

## Screenshots

Screenshot showing the Employee Tracker app starting         
![The App starting](./assets/screenshots/app%20starting.png)

Screenshot showing the Employee Tracker app closing        
![The App starting](./assets/screenshots/app%20closing.png)

## Demo

                      

## Deployed App    

[Please click to open the live app deployed to Heroku.]()


