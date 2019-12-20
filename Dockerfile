FROM node:12
# docker build -t sourcecred-widgets .

# Set up working directory.
RUN mkdir -p /code
WORKDIR /code

# Install global and local dependencies first so they can be cached.
RUN npm install -gf yarn@^1.21.1
COPY package.json yarn.lock /code/
RUN yarn

# Install the remainder of our code.
COPY . /code
RUN yarn -s build

ENTRYPOINT ["/code/bin/contributor-wall-svg.js"]
