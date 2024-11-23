FROM node:18-slim
# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
wget \
curl \
gnupg \
libx11-6 \
libgbm-dev \
libasound2 \
libatk1.0-0 \
libnss3 \
libxss1 \
libgconf-2-4 \
libxtst6 \
libgtk-3-0 \
chromium \
--no-install-recommends && \
apt-get clean && \
rm -rf /var/lib/apt/lists/*

# Install global dependencies
RUN npm install -g allure-commandline

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Install cross-env as a global package (optional, if not already in dependencies)
RUN npm install -g cross-env

# Set the environment variable
ENV ENV=test

# Set WebdriverIO command as the default command
CMD ["npx", "wdio", "run", "./wdio.conf.ts"]