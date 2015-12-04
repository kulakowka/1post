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

You must change it, if you want to run in production.

- `ADMIN_USERNAME=kulakowka`
- `COOKIE_SECRET=1P0F55gj3dsss777kllpom`
- `MAILGUN_DOMAIN=sandboxa2fa6aec1054486ba188ee59ad0fcdbd.mailgun.org`
- `MAILGUN_API_KEY=key-2fea16609fb8a7434a05e84a4c480ac1`
- `MONGO_URL=mongodb://localhost/express_app_v7`
- `PORT=3000`
- `NODE_ENV=production`

#### Google Analytics Dashboard

I set up a special dashboards to monitor the most important parameters of the project. This is [link to GA report template](https://www.google.com/analytics/web/template?uid=645KqV6oR4a7bJ4pJ_Cu9A).

