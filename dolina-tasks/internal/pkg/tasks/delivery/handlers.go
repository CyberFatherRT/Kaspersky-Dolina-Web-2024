package delivery

import (
	"dolina/internal/pkg/hub"
	"dolina/internal/pkg/tasks"
)

const ServerMain = "https://a106318.tech"

type Handler struct {
	uc  tasks.Usecase
	hub hub.Hub
}

func NewHandler(uc tasks.Usecase, hb hub.Hub) *Handler {
	return &Handler{uc: uc, hub: hb}
}
