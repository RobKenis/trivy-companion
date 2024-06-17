package main

import (
	"net/http"
	"os"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/robkenis/trivy-companion/internal/utils"
)

func main() {
	log.Logger = zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.TimeOnly}).With().Timestamp().Caller().Logger()

	webDirectory := utils.GetEnv("STATIC_WEB_DIRECTORY", "./web")
	log.Debug().Msg("Using web directory: " + webDirectory)
	fs := http.FileServer(http.Dir(webDirectory))

	r := http.NewServeMux()

	r.Handle("GET /", fs)

	srv := &http.Server{
		Handler:      r,
		Addr:         "0.0.0.0:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Info().Msg("Starting server on port 8080...")
	log.Fatal().Err(srv.ListenAndServe())
}
