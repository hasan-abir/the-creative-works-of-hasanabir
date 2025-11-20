FROM node:25-slim
WORKDIR /usr/local/app

# Install the application dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy in the source code
COPY . .

ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["npm", "run", "dev"]