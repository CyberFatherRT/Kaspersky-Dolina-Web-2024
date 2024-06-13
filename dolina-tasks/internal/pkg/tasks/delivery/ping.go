package delivery

import (
	"github.com/gorilla/websocket"
	"github.com/satori/uuid"
	"net/http"
)

// Задание 4:
// Необходимо получить http запрос и превратить его в вебсокет
// После чего коннект отправить в хаб
func (h *Handler) PingPongTaskHandler(w http.ResponseWriter, r *http.Request) {

	var connection *websocket.Conn
	h.hub.AddClient(uuid.NewV4(), connection)
}
