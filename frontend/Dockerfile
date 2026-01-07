FROM node:25-slim
# RUN useradd -ms /bin/sh -u 1001 app
# USER app

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy source files into application directory
COPY . .

ENV HOST=0.0.0.0
EXPOSE 3000

# RUN npm run dev

CMD ["npm", "run", "dev"]