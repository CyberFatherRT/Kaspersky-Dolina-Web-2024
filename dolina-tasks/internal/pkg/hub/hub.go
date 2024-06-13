package hub

import (
	"context"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/satori/uuid"
	"sync"
	"time"
)

type Hub struct {
	connect sync.Map
}

func NewHub() Hub {
	return Hub{}
}

func (h *Hub) AddClient(userID uuid.UUID, client *websocket.Conn) {

	h.connect.Store(client, userID)

	//Проверяем, готов ли клиент что-то принимать или он отвалился
	go func() {
		for {
			_, _, err := client.NextReader()
			if err != nil {
				_ = client.Close()
				return
			}
		}
	}()

	//когда клиент ушел - удаляем его
	client.SetCloseHandler(func(code int, text string) error {
		h.connect.Delete(client)
		return nil
	})

}

func (h *Hub) Run(ctx context.Context) {

	t := time.NewTicker(time.Hour)
	defer t.Stop()

	for {
		select {
		case <-t.C:
			h.connect.Range(func(key, value interface{}) bool {
				connect := key.(*websocket.Conn)
				userID := value.(uuid.UUID)

				fmt.Println(connect)
				fmt.Println(userID)
				return true
			})
		case <-ctx.Done():
			return
		}
	}

}
