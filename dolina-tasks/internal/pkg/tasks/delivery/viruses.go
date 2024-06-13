package delivery

import (
	"dolina/internal/models"
	"fmt"
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
		files []models.File
	)

	file := h.uc.FindVirus(files)
	fmt.Println(file)

	//Отправляем DELETE запрос по адресу
	path, _ := url.JoinPath(ServerMain, "api/tasks/delete_file")
	fmt.Println(path)

}
