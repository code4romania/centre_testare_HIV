# base image
FROM node:14-alpine

ARG ENVIRONMENT

ENV ENVIRONMENT ${ENVIRONMENT:-production}
ENV NODE_ENV ${ENVIRONMENT}

# set working directory
WORKDIR /code

# add `/code/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:${PATH}

# install and cache app dependencies
COPY ./package*.json ./
RUN if [ "${ENVIRONMENT}" = "production" ]; \
    then npm install --production; \
    else npm install; \
    fi

COPY docker-entrypoint.sh /
COPY ./ /code/

ENTRYPOINT ["/docker-entrypoint.sh"]

# start app
CMD ["npm", "start"]
