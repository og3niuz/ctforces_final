FROM python:3.7

MAINTAINER nikrom2012@me.com

RUN apt-get update && apt-get install -y python3-dev python3-pip graphviz libgraphviz-dev pkg-config

ADD ./ctforces_backend/requirements.txt /
RUN pip3 install -r /requirements.txt
ADD ./ctforces_backend /app

ADD ./configs/django.start.sh /entrypoint.sh
ADD ./configs/db.check.py /db.check.py
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
