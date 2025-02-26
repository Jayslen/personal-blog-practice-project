# Personal Blog project.

Well, this is my first project which i did using nodeJS and Express.
This project idea is from [RoadmapSH](https://roadmap.sh/projects/personal-blog), you can check it out there, and do it yourself.

## What i learned from this project:
- How to use Express.
- How to use EJS.
- Basic Authentication.

I use EJS as my template engine, and i use Express as my serverm, and i use or try to use MVC pattern in this project.

## How to run this project:
1. Clone this project
2. Run `npm install`
3. Run `npm run server`
4. Open your browser and go to `localhost:3000`
5. Or you can test the API using Postman or another API testing tool (you can use the REST Client API extension on VSCode, and use the `api.http` file).

### Folder Structure:
```
personal-blog-node/
├── controllers/
│   └── articles.js
├── models/
│   └── file-system/
│       └── articles.js
├── routes/
│   └── crud.js
│   └── views.js  
├── views/
│   └── Admin-view.ejs
│   └── Edi-blog.ejs
│   └── Home.ejs
│   └── new-blog-view.ejs
│   └── not-found.ejs
│   └── Post.ejs
├── app.js
├── api.http
└── readme.md
```

### Note:
- The credential for the admin is:
  - username: `admin`
  - password: `admin`