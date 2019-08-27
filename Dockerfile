FROM node:12
# docker build -t sourcecred-widgets .

# Set up working directory.
RUN mkdir -p /code
WORKDIR /code

# Install global and local dependencies first so they can be cached.
RUN npm install -g yarn@^1.17
COPY package.json yarn.lock /code/
RUN yarn

# Install the remainder of our code.
COPY . /code

ENTRYPOINT ["/code/bin/contributor-wall-svg.js"]
