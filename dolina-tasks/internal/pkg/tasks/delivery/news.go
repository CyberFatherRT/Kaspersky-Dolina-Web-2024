package delivery

import (
	"bytes"
	"dolina/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"regexp"
)

// Задание 2
// Задание для backend разработки:
// Получить текущую новость от FE, распарсить ее в структуру
// Провалидировать полученную новость и отредактировать её
// Отправить полученную новость в провещяющую систему
// Передать полученную информацию на фронтенд
func (h *Handler) NewsTaskHandler(w http.ResponseWriter, r *http.Request) {

	//В этой структуре чего-то не хватает
	var (
		news models.News
		req  *http.Request
		resp *http.Response
	)

	//Здесь нужно получить данные из тела
	if err := json.NewDecoder(r.Body).Decode(&news); err != nil {
		fmt.Printf("ERROR: Can not decode json: %s\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	regex_string := fmt.Sprintf("(?i)%s", news.Secret)
	regex, err := regexp.Compile(regex_string)

	if err != nil {
		fmt.Printf("ERROR: Can not compile regex: %s\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	news.News = regex.ReplaceAllString(news.News, "")

	personal_info := []string{"secret", "password", "token"}

	for _, v := range personal_info {
		regex_string = fmt.Sprintf("%s=\".*\"", v)
		regex, _ = regexp.Compile(regex_string)
		news.News = regex.ReplaceAllString(news.News, "")
	}

	path, _ := url.JoinPath(ServerMain, "api/tasks/validate_news")

	resp_body, _ := json.Marshal(models.NewsResponse{
		News: news.News,
	})

	req, err = http.NewRequestWithContext(r.Context(), http.MethodPost, path, bytes.NewBuffer(resp_body))

	if err != nil {
		fmt.Printf("Запрос не проставлен: %s\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	req.Header.Set("X-TEAM-NAME", r.Header.Get("X-TEAM-NAME"))

	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Запрос не отправлен: %s\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(resp.StatusCode)
}
