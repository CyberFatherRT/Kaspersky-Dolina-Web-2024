package delivery

import (
	"bytes"
	"dolina/internal/models"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

// Задание 3
// Задание для backend разработки:
// Получить список файлов от FE, распарсить их в структуру
// Найти среди файлов вирусный и выбрать его
// Отправить выбранный файл в провещяющую систему
// Передать полученную информацию на фронтенд
func (h *Handler) FilesTaskHandler(w http.ResponseWriter, r *http.Request) {

	var (
		files []string
	)

	body, _ := io.ReadAll(r.Body)
	_ = json.Unmarshal(body, &files)

	//Отправляем DELETE запрос по адресу
	path, _ := url.JoinPath(ServerMain, "api/tasks/delete_file")

	for _, v := range files {

		data, _ := json.Marshal(models.VirusResponse{
			Name: v,
		})

		req, err := http.NewRequestWithContext(r.Context(), http.MethodDelete, path, bytes.NewBuffer(data))
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		req.Header.Add("X-TEAM-NAME", r.Header.Get("X-TEAM-NAME"))

		resp, _ := http.DefaultClient.Do(req)
		body, _ = io.ReadAll(resp.Body)

		fmt.Println(body, resp.ContentLength, resp.Status)
	}

	fmt.Println(path)

}
