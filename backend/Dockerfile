FROM python:3.10-slim as base

# SETUP ENV
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV VIRTUAL_ENV=/opt/venv

COPY Pipfile ./

# Install & use pipenv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN python -m pip install --upgrade pip
RUN pip install pipenv
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --dev --system --skip-lock --deploy

# Create and switch to a new user
RUN adduser --disabled-password --no-create-home appuser
USER appuser

# GENERATES AND COPY SOURCE CODE TO WORKDIR
WORKDIR /app
COPY --chown=appuser:appuser . /app

EXPOSE 8000
