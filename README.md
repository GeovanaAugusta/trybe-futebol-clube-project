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

### Login

#### Fazer login
```bash
  POST /login
```

+ Formato do corpo da Requisição:
    + Body

```json
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
  }
  ```

+ Response se o login for feito com sucesso, com um status http `200`:

```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjY0NDY2NDE2LCJleHAiOjE2NjUyNDQwMTZ9.6F-bmiupvvyGZUsyzZAx8Mw7FE16ayDlU9ev0J9TtVA"
  }
  ```
  
  + Response de validação ao tentar realizar um login sem todos os campos devidamente preenchidos (e-mail e senha), com um status http `400`:
  
 ```json
    {
      "message": "All fields must be filled"
    }
 ```

  + Response de validação ao tentar realizar um login com uma senha ou um e-mail incorretamente preenchido, com um status http `401`:
  
 ```json
    {
      "message": "Incorrect email or password"
    }
 ```
 
#### Validação do Login
```bash
  GET /login/validate
```

  + Deverá receber um `header`, com o parâmetro `authorization` onde ficará armazenado o token gerado previamente no login.

  + Response se a validação for concluída com sucesso, com um status http `200`:

 ```json
    {
      "role": "admin"
    }
 ```
 
 #### Listar todos os nomes dos times
```bash
  GET /teams
```

  + Response se os times forem listados com sucesso, com um status http `200`:

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```

  + Response de validação ao tentar listar todos os times se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar todos os times se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Listar o nome do time por ID
```bash
  GET /teams/:id
```

+ Response se o time for listado com sucesso, com um status http `200`:

```json
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```

  + Response de validação ao tentar listar o time se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar o time se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Listar os dados da tela de partidas
```bash
  GET /matches
```

  + Response se os dados da tela de partidas forem listados com sucesso, com um status http `200`:

```json
[
     {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
]
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Listar os dados da tela de partidas que estão em andamento
```bash
  GET /matches?inProgress=true
```

  + Response se os dados da tela de partidas em andamento forem listados com sucesso, com um status http `200`:

```json
[
     {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
]
```

  + Essa requisição usou `query string` para definir o parâmetro `matches?inProgress=true`.

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Listar os dados da tela de partidas que estão finalizadas
```bash
  GET /matches?inProgress=false
```

  + Response se os dados da tela de partidas finalizadas forem listados com sucesso, com um status http `200`:

```json
[
 {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  }
]
```

  + Essa requisição usou `query string` para definir o parâmetro `matches?inProgress=false`.

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Salvar uma partida com o status de inProgress como true 
```bash
  POST /matches
```

  + Formato do corpo da Requisição:
    + Body

```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true 
  }
```

  + Response se a partida foi salva com sucesso, com um status http `201`:

```json
[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
]
```

  + Response de validação ao tentar inserir uma partida com times iguais se o token for inexistente, com um status http `401`:

```json
    {
      "message": "It is not possible to create a match with two equal teams"
    }
```

  + Response de validação ao tentar inserir uma partida com um time inexistente, com um status http `401`:

```json
    {
      "message": "There is no team with such id!"
    }
```

  + Response de validação ao tentar salvar uma partida se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar salvar uma partida se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Alterar o status inProgress de uma partida para false  
```bash
  PATCH /matches/:id/finish
```

  + Deve-se receber o `id` pelo parâmetro da URL.

  + Response se os dados da tela de partidas finalizadas forem listados com sucesso, com um status http `200`:

```json
  {
    "message": "Finished"
  }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Atualizar partidas em andamento  
```bash
  PATCH /matches/:id
```

  + Deve-se receber o `id` pelo parâmetro da URL.
  
    + Formato do corpo da Requisição:
    + Body

```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1 
  }
```

  + Response se os dados da tela de partidas finalizadas forem listados com sucesso, com um status http `200`:

```json
  {
    "message": "Updated"
  }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar listar os dados da tela de partidas se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Filtrar as classificações dos times da casa
```bash
  GET /leaderboard/home 
```

  + Response se classificações forem listadas com sucesso, com um status http `200`:

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  {
    "name": "Palmeiras",
    "totalPoints": 7,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 10,
    "goalsOwn": 5,
    "goalsBalance": 5,
    "efficiency": "77.78"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 6,
    "goalsOwn": 1,
    "goalsBalance": 5,
    "efficiency": "100.00"
  },
  {
    "name": "Grêmio",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 1,
    "goalsBalance": 3,
    "efficiency": "100.00"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 0,
    "goalsBalance": 2,
    "efficiency": "100.00"
  },
  {
    "name": "São Paulo",
    "totalPoints": 4,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 4,
    "goalsOwn": 1,
    "goalsBalance": 3,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 6,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 4,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 3,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 2,
    "goalsBalance": 1,
    "efficiency": "50.00"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 2,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 2,
    "goalsOwn": 3,
    "goalsBalance": -1,
    "efficiency": "16.67"
  },
  {
    "name": "Flamengo",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 2,
    "goalsBalance": -1,
    "efficiency": "16.67"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 1,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 3,
    "goalsOwn": 6,
    "goalsBalance": -3,
    "efficiency": "11.11"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 1,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 3,
    "goalsOwn": 7,
    "goalsBalance": -4,
    "efficiency": "11.11"
  },
  {
    "name": "São José-SP",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "0.00"
  },
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```

  + Response de validação ao tentar filtrar as classificações dos times da casa se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar filtrar as classificações dos times da casa se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Filtrar as classificações dos times visitantes
```bash
  GET /leaderboard/home 
```

  + Response se classificações forem listadas com sucesso, com um status http `200`:

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  {
    "name": "Corinthians",
    "totalPoints": 6,
    "totalGames": 3,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 6,
    "goalsOwn": 2,
    "goalsBalance": 4,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 0,
    "goalsBalance": 3,
    "efficiency": "100.00"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 1,
    "goalsBalance": 2,
    "efficiency": "100.00"
  },
  {
    "name": "São Paulo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 5,
    "goalsBalance": 0,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 4,
    "goalsOwn": 5,
    "goalsBalance": -1,
    "efficiency": "44.44"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 3,
    "goalsOwn": 4,
    "goalsBalance": -1,
    "efficiency": "44.44"
  },
  {
    "name": "Grêmio",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 7,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Flamengo",
    "totalPoints": 4,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 3,
    "goalsBalance": -2,
    "efficiency": "44.44"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 3,
    "totalGames": 2,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 1,
    "goalsBalance": 0,
    "efficiency": "50.00"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 3,
    "totalGames": 3,
    "totalVictories": 1,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 6,
    "goalsOwn": 7,
    "goalsBalance": -1,
    "efficiency": "33.33"
  },
  {
    "name": "Santos",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 3,
    "goalsOwn": 3,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 2,
    "goalsOwn": 2,
    "goalsBalance": 0,
    "efficiency": "33.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 1,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 1,
    "goalsOwn": 3,
    "goalsBalance": -2,
    "efficiency": "16.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 0,
    "totalGames": 2,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 2,
    "goalsFavor": 1,
    "goalsOwn": 4,
    "goalsBalance": -3,
    "efficiency": "0.00"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 1,
    "goalsOwn": 10,
    "goalsBalance": -9,
    "efficiency": "0.00"
  }
]
```

  + Response de validação ao tentar filtrar as classificações dos times visitantes se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar filtrar as classificações dos times visitantes se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```

#### Filtrar a classificação geral dos times
```bash
  GET /leaderboard 
```

  + Response se classificações forem listadas com sucesso, com um status http `200`:

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": "80.00"
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": "73.33"
  },
  {
    "name": "Grêmio",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 8,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 7,
    "goalsOwn": 6,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "Real Brasília",
    "totalPoints": 10,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsFavor": 5,
    "goalsOwn": 4,
    "goalsBalance": 1,
    "efficiency": "66.67"
  },
  {
    "name": "São Paulo",
    "totalPoints": 8,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 1,
    "goalsFavor": 9,
    "goalsOwn": 6,
    "goalsBalance": 3,
    "efficiency": "53.33"
  },
  {
    "name": "Ferroviária",
    "totalPoints": 7,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsFavor": 7,
    "goalsOwn": 7,
    "goalsBalance": 0,
    "efficiency": "46.67"
  },
  {
    "name": "São José-SP",
    "totalPoints": 6,
    "totalGames": 5,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 5,
    "goalsOwn": 6,
    "goalsBalance": -1,
    "efficiency": "40.00"
  },
  {
    "name": "Flamengo",
    "totalPoints": 5,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 2,
    "totalLosses": 2,
    "goalsFavor": 2,
    "goalsOwn": 5,
    "goalsBalance": -3,
    "efficiency": "33.33"
  },
  {
    "name": "Cruzeiro",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 8,
    "goalsOwn": 10,
    "goalsBalance": -2,
    "efficiency": "26.67"
  },
  {
    "name": "Avaí/Kindermann",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 8,
    "goalsBalance": -4,
    "efficiency": "26.67"
  },
  {
    "name": "Botafogo",
    "totalPoints": 4,
    "totalGames": 5,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 8,
    "goalsBalance": -5,
    "efficiency": "26.67"
  },
  {
    "name": "Bahia",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 2,
    "goalsOwn": 6,
    "goalsBalance": -4,
    "efficiency": "13.33"
  },
  {
    "name": "Minas Brasília",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 4,
    "goalsOwn": 9,
    "goalsBalance": -5,
    "efficiency": "13.33"
  },
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 12,
    "goalsBalance": -9,
    "efficiency": "13.33"
  }
]
```

  + Response de validação ao tentar filtrar as classificações se o token for inexistente, com um status http `401`:

```json
    {
      "message": "Token not found"
    }
```

  + Response de validação ao tentar filtrar as classificações se o token for inválido , com um status http `401`:

```json
    {
      "message": "Token must be a valid token"
    }
```
