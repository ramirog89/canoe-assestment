## Backend Application Stack

- Backend Framework: Django
- ORM: Django ORM
- Test: Pytest
- Message Broker: Redis
- Queue Manager: Celery

### Setup Locally

In case you want to run application locally you need to follow next rules.
Take into account that you will need REDIS and POSTGRES installed locally also as dependencies.

#### 1. Setup Django app standalone

Assumption you are already running `python3` and `pipenv` locally

```
1. cd backend/
2. pipenv shell
3. pipenv install
4. ./manage migrate
5. ./manage runserver
```

#### 2. Setup Celery standalone

```
1. cd backend/
2. pipenv shell
3. celery -A src.app worker --beat --loglevel=INFO
```

### Available public routes

```
http://localhost:8000/  # swagger ui
http://localhost:8000/admin  # django admin panel
```
