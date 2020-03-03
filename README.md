<p align="center">
  <img src="https://logodownload.org/wp-content/uploads/2014/09/sky-logo-tv-2.png" height="150" />
</p>

# SKY AUTH API (TEST)

Esta API foi criada com o intuito de oferecer um ponte de integração para autenticação e autorização das aplicações mantidas pela SKY

### Utilização

#### Instalação

```bash
git clone https://github.com/jcolscript/sky-auth-test.git
cd sky-auth-test
yarn
```

Renomear o arquivo **.env.example** para **.env**.

#### Dependencias

###### Banco de dados

Usamos o banco de dados mongodb como persistência de dados de usuário.

```bash
docker run -d -p 27017:27017 --restart always --name mongodb bitnami/mongodb:latest
```

#### Servidor local

Sobe em modo offline http://localhost:3000

```bash
yarn dev
```

#### Testes

Validará o código com o ESLint e após testará a API no servidor local

```bash
yarn test
```

#### Artefatos do Postman

[tests/tests-postman/](tests/tests-postman)

#### Artefatos dos testes unitários

[tests/unit/](tests/unit)

#### Artefatos dos testes de integração

[tests/integration/](tests/integration)

### Outros comandos

##### Validar código com o ESLint

```bash
yarn eslint
```

##### Subir o servidor em modo debug para inspect

```bash
yarn dev:debug
```

# v0.1.0 - draft
