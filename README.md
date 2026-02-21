# DEPOT POUR LE PROJET NUMICAMP

## Prérequis :
- Node js ( + v22 recommandé )
- Mariadb/Mysql

## Instruction :

### GENERAL :
clonez le repo :
```shell
    git clone "https://github.com/Vali127/numicamp.git"
    cd ./numicamp
    git remote add origin "https://github.com/Vali127/numicamp.git"
```

### front-end :

1. installer les dépandances :
```sh
    npm install
```
1. Creez une **fichie de configuration** `/src/config.js` avec ce modèle.
```js
    export const API_CONFIG = {
        hostname : "localhost", //backend hostname
        port : 3000,  //backend port
    }

    export const CONFIG = {
        ReCAPTCHA_SITE_KEY : "xxxxxxxxxxxxxxxx" //public key
    }
```
**📌 Note :**  ce projet utilise `reCAPTCHA v2`.

1. **build** pour la prod
```sh
    npm run build
    npm run preview #si besoin de tester la prod
```

**⚠️ warning :**  le problème [ EVAL ] lors du build est causé par la bibliothèque `Lottie-react`.

**📌 Note :**  n' oublie pas de changer la variable d' environment correspondant dans le back si vous tester en prod.

### Back-end

1. Installation des dépendances :
```shell
    git clone "https://github.com/Vali127/numicamp.git"
    cd ./numicamp
    git remote add origin "https://github.com/Vali127/numicamp.git"
```
2. créer une base de données `numicamp` (de préférence).
3. importer le squelette de la base de données.
```sh
    mysql -u <user> -p numicamp < skeleton.sql
```
4. créer le fichier `.env` avec ce modèle.
```env
DB_HOST=<hostname>
DB_PORT=<db port>
DB_USER=<db user>
DB_PASSWORD=<db user password>
DB_NAME=<db name>
SERVER_PORT=<backend server port>
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxx
FRONTEND_DEV_URL=<front-end url for development>
FRONTEND_PROD_URL=<front-end url for production>
MAIL=<mail address for the plateform ex:numicamp.service@gmail.com>
MAIL_PASSWORD=<application password of the mail format : "xxxx xxxx xxxx xxxx">
SECRET_KEY_RECAPTCHA=6Let9lxxxxxxxxxxxxxxxxxxxxxxxxx
NODE_ENV=<value : production or devlopment>
```


☕ That's all , THANKS !