O Jogo pode ser acessado aqui:  https://termo-7n23.onrender.com

## 1. O Codle:

O **Codle** é uma releitura do clássico jogo de palavras “Termo”/“Wordle”, em que o usuário tenta adivinhar uma palavra de 5 letras em até 6 tentativas.  

![image](https://github.com/user-attachments/assets/d7413b10-44e4-480b-b2f9-8688a00630b9)


Missão neste projeto é **desenvolver uma interface web que recrie a experiência de um jogo de palavras no estilo "Termo" ou "Wordle"**. Se ainda não sabe do que se trata: [Termo.ooo](https://term.ooo/).

---
## 2. Requisitos e funcionalidades

Interface interativa com as seguintes funcionalidades:

| Item | Descrição                                                                            | Status |
| ---- | ------------------------------------------------------------------------------------ | ------ |
| 1    | Campo de entrada ou captura de teclas para as tentativas                             | ☑      |
| 2    | Cálculo de feedback por letra (posição certa, letra certa local errada, inexistente) | ☑      |
| 3    | Gerenciar o número de tentativas disponíveis.                                        | ☑      |
| 4    | Controle de 6 linhas de tentativa.                                                   | ☑      |
| 5    | Mecanismo para detectar vitória ou derrota.                                          | ☑      |
| 6    | Possibilidade de começar um novo jogo com uma nova palavra aleatória                 | ☑      |
*(usado como base durante o desenvolvimento)*

## 3. Aprendizado
- UseState
- UseEffect
- Typescript
- Django
- Docker/Docker Compose
- GithubActions CI/CD
- Deploy on OnRender
- Claude

## 4. Developing com Docker
- acesse ou o codle-react(front) ou o backend
- use 'docker compose -f docker-compose.dev.yaml up'

## 5. Inicializando com Docker Localmente
- use 'docker compose up' to initialize.

# OBS:
- Primeiro tera que setar as envs necessárias
- UID/GID serve para lidar com permissões entre sua máquina e o DOCKER
  - Se estiver com problemas para manipular arquivos do container que estão conversando
  - com seus arquivos locais através dos volumes, rode sudo chown -R $USER:$USER .
- MONGO_URI para o backend conectar com seu banco de dados Mongo.
- Após isso rode 'docker compose up' na página local.