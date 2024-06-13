package main

import (
	"context"
	"dolina/internal/pkg/hub"
	"dolina/internal/pkg/tasks/delivery"
	"dolina/internal/pkg/tasks/usecase"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func init() {
	if err := godotenv.Load(); err != nil {
		fmt.Println(err)
	}
}

func main() {

	hb := hub.NewHub()
	uc := usecase.NewUsecase()
	h := delivery.NewHandler(uc, hb)

	//В этом файле описывается API вашего приложения
	r := mux.NewRouter().PathPrefix("/api").Subrouter()
	r.Use(mux.CORSMethodMiddleware(r))

	//Это обработчик запросов, которые не попали под другие
	r.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL)
		log.Println(r.Method)
		http.Error(w, "Not implemented", http.StatusNotImplemented)
	})

	//В этом блоке находятся обработчики запросов, связанные с задачами
	tasks := r.PathPrefix("/tasks").Subrouter()
	tasks.Methods(http.MethodGet, http.MethodOptions).
		Path("/weather").HandlerFunc(h.WeatherTaskHandler)
	tasks.Methods(http.MethodPost, http.MethodOptions).
		Path("/validate_news").HandlerFunc(h.NewsTaskHandler)
	tasks.Methods(http.MethodPost, http.MethodOptions).
		Path("/find_viruses").HandlerFunc(h.FilesTaskHandler)
	tasks.Methods(http.MethodGet, http.MethodOptions).
		Path("/ping").HandlerFunc(h.PingPongTaskHandler)

	//Здесь описываются параметры вашего сервера
	srv := &http.Server{
		WriteTimeout:      1 * time.Minute,
		ReadTimeout:       1 * time.Minute,
		ReadHeaderTimeout: 1 * time.Minute,
		MaxHeaderBytes:    100 * 1024,
		Handler:           r,
		Addr:              ":8080", //Это порт, на котором запущено ваше приложение
	}

	//Gracefull shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := srv.ListenAndServe(); err != nil {
		}
	}()

	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Println(fmt.Sprintf("unable to correctly stop server: %v", err))
	}

}
