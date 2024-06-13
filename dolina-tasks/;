package delivery

import (
	"dolina/internal/models"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

// Задание 1
// Задание для backend разработки:
// Совершить запрос на сервер погоды
// Получить от него ответ и распарсить его в структуру с нужными полями
// Передать полученную информацию на фронтенд
func (h *Handler) WeatherTaskHandler(w http.ResponseWriter, r *http.Request) {

	//В этой модели не хватает полей: нужно ее дополнить
	var weather models.Weather

	path, _ := url.JoinPath(ServerMain, "/api/tasks/weather")
	city := r.URL.Query().Get("city")

	path = fmt.Sprintf("%s?city=%s", path, city)

	//Здесь создается запрос
	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, path, nil)
	if err != nil {
		fmt.Printf("Запрос не проставлен: %s\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Здесь запрос выполняется
	response, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Запрос не отправлен: %s\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Дальше вам нужно
	data, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("Текущая погода: %s\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Здесь выведется то, что мы получили из ответа
	fmt.Println(fmt.Sprintf("Текущая погода от системы: %s", string(data)))

	w.Header().Add("Content-Type", "application/json")
	if _, err := w.Write(data); err != nil {
		fmt.Printf("Bruh, %s\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Здесь нужно вернуть текущую погоду FE
	fmt.Println(fmt.Sprintf("Текущая погода: %s", weather))
}
