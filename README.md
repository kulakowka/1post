### Development:

`DEBUG=app:*  nodemon ./bin/www --es_staging`

`DEBUG=app:*  npm start`

### Tests:

`npm run test`

### Production:

`PORT=3000 NODE_ENV=production forever start ./bin/www --harmony`

### Env vars:

- `PORT=3000`
- `NODE_ENV=production` 
- `MONGO_URL=mongodb://localhost/express_app_v7`
- `ADMIN_USERNAME=kulakowka`
- `API_KEY=784e6e620d3147b38ac196733a94f461`

### Ideas:

https://github.com/HenrikJoreteg/templatizer

### Roadmap

- [ ] Show errors in forms
- [X] Sitemap.xml 
- [ ] RSS feed
- [X] User profile
- [X] Email send
- [ ] Social login 
- [ ] Refactoring and clean up coments

Email

- [ ] Confirm email
- [ ] New reply on your comment

Comments

- [ ] Editing comments
- [X] Deleting comments
- [ ] Dropdown in top right angle for share, edit, delete and etc...
- [ ] Pagination for mainpage and replies

