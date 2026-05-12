# Codle

> A Portuguese Wordle clone — guess the 5-letter word in up to 6 tries.

🎮 **[Play it here →](https://termo-7n23.onrender.com)**

![Codle screenshot](https://github.com/user-attachments/assets/d7413b10-44e4-480b-b2f9-8688a00630b9)

---

## What is it?

Codle is a web remake of [Termo](https://term.ooo/) / Wordle. You have 6 attempts to guess a hidden 5-letter Portuguese word. After each guess, each letter is highlighted to show how close you are:

- 🟩 **Green** — correct letter, correct position
- 🟨 **Yellow** — correct letter, wrong position
- ⬛ **Gray** — letter not in the word

New game, new word. Simple as that.

---

## Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React + TypeScript          |
| Backend  | Django (Python)             |
| Database | MongoDB                     |
| Infra    | Docker / Docker Compose     |
| CI/CD    | GitHub Actions + Render     |

---

## Running locally

### Prerequisites

- Docker and Docker Compose installed
- A MongoDB connection string

### 1. Set environment variables

Create a `.env` file (or export the variables) before running anything:

```env
# Your user/group ID — avoids file permission issues between host and container
UID=1000
GID=1000

# MongoDB connection string for the backend
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>
```

> **Permission issues?** If you can't edit files mounted from the container, run:
> ```bash
> sudo chown -R $USER:$USER .
> ```

### 2. Start the app

```bash
# Production mode
docker compose up

# Development mode (with hot reload)
# Run from the frontend or backend directory:
docker compose -f docker-compose.dev.yaml up
```

The app will be available at `http://localhost:3000` (or whichever port is configured).

---

## Features

| # | Feature | Status |
|---|---------|--------|
| 1 | Keyboard input capture | ✅ |
| 2 | Per-letter feedback (correct / misplaced / absent) | ✅ |
| 3 | 6-attempt limit | ✅ |
| 4 | Win / loss detection | ✅ |
| 5 | New game with a random word | ✅ |

---

## What I learned building this

- React `useState` and `useEffect`
- TypeScript in a React project
- Django REST API
- Docker & Docker Compose (dev vs. prod configs)
- GitHub Actions for CI/CD
- Deploying to Render

---

## License

MIT
