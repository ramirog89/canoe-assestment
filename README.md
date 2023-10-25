## Tech Home Assestment


## Frontend Application Stack

- Render Library: React
- Side Effects Manager: React Hooks
- State Management Library: ReactContext
- Router library: React Router
- Component Library: Material UI

## Commands
* **installation:** `npm run install`
* **develop:** `npm run start` *starts the app on development mode*
* **test:** `npm run test` *unit tests*
* **build:** `npm run build` *generates build package*

## Scaffolding
* src (folder) `source code`
* * constants (folder) `app constants`
* * models (folder) `entity models, typeguards, interfaces, enums, and other ts related files`
* * modules (folder) `main app modules`
* * * hooks (folder) `react hooks that abstract business logic to handle side effects`
* * * state-mgmt (folder) `state management files grouped by entity and store creation`
* * * views (folder) `react components grouped by page and shared folder including cross app components`


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
4. ./manage runserver
```

### 2. Setup Celery standalone

```
1. cd backend/
2. pipenv shell
3. celery -A src.app worker --beat --loglevel=INFO
```

## Scalability Considerations:

How will your application work as the data set grows increasingly larger?
How will your application work as the # of concurrent users grows increasingly larger?