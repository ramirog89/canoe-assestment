FROM python:3.10-slim as base

RUN apt-get update && apt-get -y install gcc make autoconf automake ncat

# SETUP ENV
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV VIRTUAL_ENV=/opt/venv

WORKDIR /app

COPY Pipfile ./
COPY src ./
COPY manage.py ./

# Install & use pipenv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN python -m pip install --upgrade pip
RUN pip install pipenv
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --dev --system --skip-lock --deploy

RUN adduser --disabled-password --no-create-home appuser
USER appuser

# GENERATES AND COPY SOURCE CODE TO WORKDIR
COPY --chown=appuser:appuser . /app

EXPOSE 8000
