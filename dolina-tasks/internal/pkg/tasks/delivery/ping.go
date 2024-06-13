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

	upgrade := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}

	connection, err := upgrade.Upgrade(w, r, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	h.hub.AddClient(uuid.NewV4(), connection)
	h.hub.Run(r.Context())
}
