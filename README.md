# DEPOT POUR LE PROJET NUMICAMP

## Prérequis :
- Node js ( + v22 recommandé )

## Instruction :
1. Clonez le repots :
```shell
    git clone "https://github.com/Vali127/numicamp.git"
    cd ./numicamp
    git remote add origin "https://github.com/Vali127/numicamp.git"
```
2. Creez votre branche à developper
```shell
    git checkout -b utilisateur/Nom_du_branche
```

3. develleoper sur la branche
4. faire un push vers votre branche
```shell
    git push origin utilisateur/Nom_du_branche
```
5. Ouvrez un pull request
### Partie front-end
1. Aller dans le dossier Frontend
```shell
    cd Frontend/
```
2. Installation des dépendances :
```shell
    npm install
```
2. Commencer le live server de react+vite
```shell
     npm run dev -- --host
```
ou
```shell
    npm run dev
```

### Partie back-end
1. Aller dans le dossier Backend
```shell
    cd Backend/
```
2. Installation des dépendances :
```shell
    npm install
```
3. Démarrage du serveur node
```shell
      node server.js
```
### Importation de la base de données dans mysql
1. Se connecter au serveur local mysql
```shell
      mysql -u user -p 
```
ou
```shell
        mysql -u user
```
2. Créer une base de données vide puis quitter
```shell
      CREATE DATABASE numicamp;
      exit;
```
3. Importer la base de donnée 
```shell
      mysql -u user -p numicamp < numicamp.sql
```