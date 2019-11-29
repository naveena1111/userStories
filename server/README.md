
## Api path

http://localhost:3000/


## Installation
```
npm install
```

## Start server
```
npm start
```
## before connecting set your environment
Install node js ,mysql.
setup mysql


## change your configuration settings in config json in development.
eg: username : naveena,
and password
## create database schoolmngment

## server is running in port 3000


## api list

## 1. method :post (register)

http:localhost:3000/api/register

req.body

{"teacher":"teacher1@gmail.com",
"students":[
	"student1@gmail.com",
	"student2@gmail.com"]
}

## 2.method :get (get student list of the teachers)

http:localhost:3000/api/commonstudents?teacher=teacher1@gmail.com

http:localhost:3000/api/commonstudents?teacher=teacher@gmail.com&teacher=teacher5@gmail.com

## 3. method :post (suspend)

http:localhost:3000/api/suspend

req.body

{"student":"student8@gmail.com"}

## 4. method : post (retrive notification)

http:localhost:3000/api/retrivefornotification
1.

req.body

{"teacher":"teacher1@gmail.com",
	"notification": "hello @student1@gmail.com  "
}

2.

req.body

{"teacher":"teacher1@gmail.com",
	"notification": "hello everyone  "
}

