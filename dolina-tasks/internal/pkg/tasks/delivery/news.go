package delivery

import (
	"dolina/internal/models"
	"fmt"
	"net/http"
	"net/url"
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
		req *http.Request
		resp http.Response
	)

	//Здесь нужно получить данные из тела

	//Точно ли фронтенд все провалидировал?
	news = h.uc.Validate(news)

	//Отправляем POST запрос по адресу
	path, _ := url.JoinPath(ServerMain, "api/tasks/validate_news")
	fmt.Println(path)

	//Копируем хедер перед отправкой!
	req.Header.Set("X-TEAM-NAME", r.Header.Get("X-TEAM-NAME"))

	//После выполнения запроса возвращаем результат
	w.WriteHeader(resp.StatusCode)
}
