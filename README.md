### Development:

`DEBUG=app:*  nodemon ./bin/www --es_staging`

`DEBUG=app:*  npm start`

### Tests:

`npm run test`

### Production:

`NODE_ENV=production PORT=3000 MONGO_URL=mongodb://localhost/express_app_v7 node ./bin/www --es_staging`

### Ideas:

Вот кстати штука для создания javascript темплейтов из jade 
Можно прикрутить и рендерить на клиенте все необходимые шаблоны
Или вообще все страницы?  
https://github.com/HenrikJoreteg/templatizer