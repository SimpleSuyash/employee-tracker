
[![inquirer](https://img.shields.io/badge/inquirer-blue?style=for-the-badge&logo=npm&logoColor=white&labelColor=red)](https://www.npmjs.com/package/inquirer) [![express js](https://img.shields.io/badge/express.js-blue?style=for-the-badge&logo=express&logoColor=white&labelColor=red)](https://expressjs.com/) [![node.js](https://img.shields.io/badge/Node.js-blue?style=for-the-badge&logo=Node.js&logoColor=white&labelColor=red)](https://nodejs.org/en) [![npm](https://img.shields.io/badge/npm-blue?style=for-the-badge&logo=npm&logoColor=white&labelColor=red)](https://www.npmjs.com/) [![mysql](https://img.shields.io/badge/mysql-blue?style=for-the-badge&logo=mysql&logoColor=white&labelColor=red)](https://www.mysql.com/)


<div align="right"> 
<a href= "http://www.wtfpl.net/about/"><img src = "https://img.shields.io/badge/License-WTFPL-brightgreen.svg"></a>
</div>

# Employee Tracker    

This app lets users to view and manage the departments, job roles, and employees of a given company.

##  Description

Through commandline interface, the users can view departmenst, add a new department, update and delete an exsisting department. Similarly, job roles and employes can be managed. 

By creating this project, I learnt to install the `Node.js` and the `npm`, and build and use `modules` which enable us to separate logically distinct part of the script into different scripting files. I also learnt to use various included packages in `node_modules` such as `chalk`, `figures`, `log-symbols`. I also learnt [`ANSI Escape Codes`](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797), which helps to change the style of console log text.  I also learnt to design a database schema, populate relational data, and perform various `CRUD` queries.



## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Licence](#licence)
1. [Screenshots](#screenshots)
1. [Demo](#demo)


## Installation 

1. Download and Install the `Node.js` 
1. Install `NPM` by typing
    ```       
    npm init -y
    ```
1. Install `Express`     
    ```         
    npm i express
    ```
1. Install `Body-Parser` Plugin
    ```
    npm i body-parser --save
    ```
1. Install `Nodemon` Plugin as  Dev Dependency
    ```
    npm i -D nodemon
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


After installation of all the required plugins and packages, change the `script` value to  the following:            
       
    {            
        "start": "node server",               
        "dev": "nodemon server"                  
    }                  

And the `package.json` file should look like below:              
![package.json](./public/assets/images/package.png)

## Usage
During the development, 
- Open a new terminal in `Command Prompt` or `Git Bash` or `Visual Studio Code Terminal`
- Change directory to the parent folder of `server.js`
- Initiate the `Nodemon` by typing the following, which will automatically restart the server everytime the server-side code is changed.
    ```
    npm run dev
    ```
- Type the following in the broswer to open the app
    ```
    localhost:3001
    ```
## Licence

This app is licensed under [**WTFPL**](http://www.wtfpl.net/about/)

## Screenshots

Screenshot showing the Note Take app index page          
![Index Page](./public/assets/images/index.png)

Screenshot showing notes page             
![Notes Page](./public/assets/images/notes.png)

## Demo

                      

## Deployed App    

[Please click to open the live app deployed to Heroku.]()


