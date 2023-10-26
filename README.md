## Tech Home Assestment

This repository contains all pieces related Home Assestment.

### Directory Structure

* backend (folder) `backend source code`
* frontend (folder) `frontend source code`
* infrastructure (folder) `infrastructure components`
* docs (folder) `diagram and notes`

### Docker Setup (RECOMMENDED)

Assumption you are already running `python3` and `docker` locally

```
1. cd infrastructure/
2. docker compose up
```

#### Running tests from docker

```
docker exec -it assestment-backend python 'manage.py' 'test' 'src.tests'
docker exec -it assestment-frontend npm run test
```

In case docker is not available locally, you can run each application standalone following Setup instructions on each application README and take into account that REDIS and POSTGRES are dependencies.