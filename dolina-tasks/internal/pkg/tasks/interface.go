package tasks

import "dolina/internal/models"

//go:generate mockgen -source=interface.go -destination=mocks/mock.go
type Usecase interface {
	Validate(post models.News) models.News
	FindVirus(post []models.File) models.File
}
