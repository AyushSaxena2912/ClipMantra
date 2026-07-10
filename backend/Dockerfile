# FROM node:22-slim

# RUN apt-get update && apt-get install -y \
#     ffmpeg \
#     python3 \
#     python3-pip \
#     curl \
#     unzip \
#     && curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh \
#     && curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
#     && chmod a+rx /usr/local/bin/yt-dlp \
#     && pip3 install faster-whisper bgutil-ytdlp-pot-provider --break-system-packages \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# ENV PATH="/usr/local/bin:$PATH"

# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# CMD ["node", "dist/server.js"]




FROM node:22-slim

# NOTE: we deliberately use yt-dlp's nightly ("master-builds") releases here
# instead of the stable channel. YouTube frequently ships anti-bot changes
# that break downloads within days, and fixes for those land in nightly
# builds well before they reach a stable release.
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    curl \
    git \
    unzip \
    && curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh \
    && curl -L https://github.com/yt-dlp/yt-dlp-master-builds/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp \
    && pip3 install "bgutil-ytdlp-pot-provider==1.3.1" --break-system-packages \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# bgutil PO Token provider server — generates the proof-of-origin tokens
# yt-dlp's "web" client now requires for YouTube downloads. Without this
# server running, yt-dlp silently falls back to image-only formats.
# Version pinned to match the plugin installed above.
RUN git clone --depth 1 --branch 1.3.1 \
      https://github.com/Brainicism/bgutil-ytdlp-pot-provider.git \
      /opt/bgutil-provider \
    && cd /opt/bgutil-provider/server \
    && npm ci \
    && npx tsc

ENV PATH="/usr/local/bin:$PATH"
ENV BGUTIL_PROVIDER_SCRIPT="/opt/bgutil-provider/server/build/main.js"

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/server.js"]