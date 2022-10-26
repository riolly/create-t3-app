```
# Local
DATABASE_URL=mysql://{password}@localhost:3306/{database_name}

# Remote planetscale
# DATABASE_URL=mysql://root@127.0.0.1:3309/{database_name}
# DATABASE_URL=mysql://{password}:pscale_pw_{random_string}@{region}.connect.psdb.cloud/{database_name}?sslaccept=strict

NEXTAUTH_SECRET={random_string}
NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_URL=https://domain.vercel.app

GOOGLE_CLIENT_ID={random_string}.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET={random_string}
```
