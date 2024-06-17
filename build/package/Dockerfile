FROM golang:1.22 as builder

WORKDIR /build

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY internal internal
COPY cmd cmd

RUN CGO_ENABLED=0 GOOS=linux go build -o server cmd/server.go

FROM node:lts as web_builder

WORKDIR /build

COPY web/package.json .
COPY web/package-lock.json .

RUN npm install

COPY web .

RUN npm run build

FROM scratch

WORKDIR /app

COPY --from=builder /build/server server

COPY --from=web_builder /build/dist/trivy-companion/browser web

ENV STATIC_WEB_DIRECTORY /app/web

EXPOSE 8080

CMD ["/app/server"]
