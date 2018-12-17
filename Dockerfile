FROM ubuntu:14.04

RUN apt-get update -y

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs

ADD . /src
WORKDIR /src

EXPOSE 8200
RUN npm install -y
CMD ["npm", "run", "server"]
