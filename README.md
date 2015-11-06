### Development:

`DEBUG=app:*  nodemon ./bin/www --es_staging`

`DEBUG=app:*  npm start`

### Tests:

`npm run test`

### Production:

`PORT=3000 NODE_ENV=production forever start ./bin/www --harmony`

### Ideas:

Вот кстати штука для создания javascript темплейтов из jade 
Можно прикрутить и рендерить на клиенте все необходимые шаблоны
Или вообще все страницы?  
https://github.com/HenrikJoreteg/templatizer