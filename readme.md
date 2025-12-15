** For those from MOOC DOCKER course, this is wordle but in portuguese.

## 1. O Codle:

O **Codle** é uma releitura do clássico jogo de palavras “Termo”/“Wordle”, em que o usuário tenta adivinhar uma palavra de 5 letras em até 6 tentativas.  

![image](https://github.com/user-attachments/assets/d7413b10-44e4-480b-b2f9-8688a00630b9)


Missão neste projeto é **desenvolver uma interface web que recrie a experiência de um jogo de palavras no estilo "Termo" ou "Wordle"**. Se ainda não sabe do que se trata: [Termo.ooo](https://term.ooo/).

---
## 2. Requisitos e funcionalidades

Interface interativa com as seguintes funcionalidades:

| Item | Descrição                                                                            | Status |
| ---- | ------------------------------------------------------------------------------------ | ------ |
| 1    | Campo de entrada ou captura de teclas para as tentativas                             | ☐      |
| 2    | Cálculo de feedback por letra (posição certa, letra certa local errada, inexistente) | ☐      |
| 3    | Gerenciar o número de tentativas disponíveis.                                        | ☐      |
| 4    | Controle de 6 linhas de tentativa.                                                   | ☐      |
| 5    | Mecanismo para detectar vitória ou derrota.                                          | ☐      |
| 6    | Possibilidade de começar um novo jogo com uma nova palavra aleatória                 | ☐      |
*(usado como base durante o desenvolvimento)*

## 3. Aprendizado
- UseState
- UseRef
- Context
- UseEffect
- Typescript
- JSX
- SOLID principles

## 4. Inicializando o projeto
- npm install /codle-react
- npm run dev /codle-react

## 5. Inicializando com Docker
- use 'docker compose up' to initialize.
- or
- 'docker build -f dockerfile.prod -t wordle . && docker run -it -p 127.0.0.1:4173:4173 wordle'
- You can also access from dockerhub: tranche100/wordle .
- So running 'docker run -it -p 127.0.0.1:4173:4173 tranche100/wordle', also works.