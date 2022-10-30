# Trybe Futebol Clube

Neste projeto foi desenvolvido um site informativo sobre partidas e classificações de futebol. Foi feita a criação de uma API que foi consumida por um front-end já disponibilizado pela Trybe, através da criação de um docker-compose.

## Habilidades

- Dockerização dos apps, network, volume e compose;

- Modelagem de dados com MySQL através do Sequelize;

- Criação e associação de tabelas usando models do sequelize;

- Construção de uma API REST com endpoints para consumir os models criados;

- Construção de um CRUD com TypeScript, utilizando ORM.


## Instruções Gerais

- Clone o repositório

 `git clone git@github.com:GeovanaAugusta/trybe-futebol-clube-project.git`.
 
 - Entre na pasta do repositório que você acabou de clonar:
    
 `cd trybe-futebol-clube-project
`

## Utilizando o Docker

- Instale o Docker, caso ainda não o tenha instalado;

- Ainda no seu terminal, na raíz da pasta use o comando:

`npm run compose:up:dev`

- Dessa forma será inicializado um container chamado app_frontend, outro app_backend e o banco de dados. Na sequência use o comando:

`docker exec -it [ID do app_backend] bash`

- Dessa forma terá acesso ao terminal interativo do container criado pelo compose que está rodando em segundo plano;

- Por fim, instale as dependências e inicie a aplicação que rodará na porta 3000:

``` bash
npm install
npm run dev
```

## Rodando localmente

- Configure as variáveis de ambiente editando o arquivo `.env.example` com suas respectivas variáveis e o renomeando em seguida para `.env`.
- Por fim, instale as dependências e inicie a aplicação que rodará na porta 3000:


``` bash
npm install
npm run dev
```

# Documentação da API

- Em progresso.


