#### Built With

* NodeJS
* Express
* Nodemailer
* Sequelize

<br>

## Installation
`npm install`

`npm start`

dont forget to create .env and fill the boilerplate from .env.example

<br>

## Endpoints

API Endpoint Host : http://103.134.154.18:8081

<br> 

### Register USER
`POST` http://103.134.154.18:8081/register

Example Request Payload:
```
{
    "email": "reinhardjsilalahi@gmail.com",
    "password": "a1A@a1A@"
}
```

Example Response Payload:
```
{
    "email": "reinhardjsilalahi@gmail.com",
    "password": "a1A@a1A@",
    "updatedAt": "2022-12-07T09:47:32.309Z",
    "createdAt": "2022-12-07T09:47:32.309Z"
}
```

<br>


### Delete All User (if u want to try register again with the same email)
`DELETE` http://103.134.154.18:8081/deleteAll

Example Response Payload:
```
{
    "message": "Successfully deleted all user records"
}
```
