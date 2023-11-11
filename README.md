# stickyNotes
Sticky notes
# <a name="_l9a5qokprd00"></a>ReadME
The application is made using NodeJs and ExpressJS.

Steps to setup application in local.

- Download the application zip and extract it.
- Download nodeJS if not downloaded(<https://nodejs.org/en/download>)
- From ./stickyNotes in the terminal. Install require dependencies
- First try npm install to automatically install all the dependencies
- If it fail manually install the following dependencies
  - `  `npm install bcrypt body-parser express jsonwebtoken knex nodemon sqlite3 uuid 
- To start the application
  - Use npm start (for automatic run using nodemon)
  - npm dev (for node  server.js)

- Database used : sqlite3 with knex as orm.
- Database will be auto generated
- Existed login creds
  - For admin

`		`Email :  <admin@gmail.com>

`		`Password : password

- For sample user
  - Email : <user1@gmail.com>
  - Password : password
- The above emails have data associated with it



This is only the backend endpoints description.
## <a name="_hn8n5larm5fw"></a>Authentication
- ### <a name="_ped2xk27xeo6"></a>Register : */register*
  - {

`    `"name"   : "",

`    `"email" : "",

`    `"password" : "",

`    `"role" : "USER"  

}

- Role can be USER/ADMIN
- Password stored after encryption with bcrypt
- ### <a name="_z8o96lcysywo"></a>Login : */login*
  - {

`    `"email" : "user4@gmail.com",

`    `"password" : "password"

}

- Every Time user login a jwt token will be created that need to passed as bearer authentication token and it expires in 1hr
- Using a token we can know the userId and role for role based changes.


## <a name="_kaqn7kah1vz0"></a>Notes
- Get all Notes :   */notes*
  - If Role is user 
    - Returns all notes of the user
  - If role is admin
    - Returns all notes in the db
  - Basis the JWT token after login automatically the route return notes basis role
- Post note : */notes*
  - {

`    `"title" : "",

`    `"content" : "",

`    `"visibility" : ""

}

- Irrespective of role the note will be saved basis the userId from token
- Visibility defines public or private  as o and 1 respectively
- Update note : */notes/:id*
  - {

`    `"title" : "",

`    `"content" : "",

`    `"visibility" : ""

}

- Note id should be passed in url (Id can be found by get all notes end point)
- Can update the above params and after update updated\_at date will be updated automatically
- Delete Note  */notes/:id* 
  - Checks note exist for that user is role is USER basis id from url params
  - For admin if node exists deletes automatically
## <a name="_jw4sg3jy9jg3"></a>Feed
- Get public feed  */feed*
  - Returns all the public notes not including the login user if role is USER sorted basis updated\_at 

## <a name="_r10lfl7fnk1x"></a>USERS
- This is for admin only accessible to admin login credentials
- Get all users */user/all*
  - Returns all users in the db
- Promote user to admin */user/promote*   
  - { "userId" : "1b24df37-1386-4daa-b312-0d81a74c685" }
## <a name="_eti9pewd65s3"></a>Invite Link
- Invite link : */invite-user*
  - Accessible to admin only 
  - Request body :   { “email” : “<temp@gmail.com>” }
  - A token is generated for the email 
  - Sample output

{   "inviteLink": "<http://domain.com/accept-invite?token=5c548cb379aa38216fc03efc12c15fa3>"}
