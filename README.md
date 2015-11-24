#### Install:

```
git clone https://github.com/kulakowka/1post.git
cd 1post
npm install 
```

#### Development:

```
npm start
```

Open in your browser [http://localhost:3000](http://localhost:3000)

#### Production:

```
PORT=3000 NODE_ENV=production forever start ./bin/www --harmony
```

#### Default environment variables:

- `ADMIN_USERNAME=kulakowka`
- `COOKIE_SECRET=1P0F55gj3dsss777kllpom`
- `MAILGUN_DOMAIN=sandboxa2fa6aec1054486ba188ee59ad0fcdbd.mailgun.org`
- `MAILGUN_API_KEY=key-2fea16609fb8a7434a05e84a4c480ac1`
- `MONGO_URL=mongodb://localhost/express_app_v7`
- `PORT=3000`
- `NODE_ENV=production`

You must change it, if you want to run in production.