FROM python:3.8.6

# Install Gunicorn
RUN pip install --upgrade pip \
    && pip install gunicorn==20.1.0

# Install requirements
RUN mkdir multiplexing-integration-demo
COPY requirements.txt multiplexing-integration-demo/
WORKDIR multiplexing-integration-demo
RUN pip install --requirement requirements.txt

# Copy code
COPY . .

CMD ["gunicorn", \
     "--bind", "0.0.0.0:5000", \
     "--access-logfile", "-", \
     "--error-logfile", "-", \
     "--workers", "1", \
     "--worker-class", "gthread", \
     "--threads", "20", "app:app"]
