package usecase

import (
	"dolina/internal/models"
	"dolina/internal/pkg/tasks"
)

type Usecase struct {
}

func NewUsecase() tasks.Usecase {
	return &Usecase{}
}

// Здесь вам необходимо дописать валидацию новости перед отправкой на проверяющую систему
func (u *Usecase) Validate(models.News) models.News {
	return models.News{}
}

// Здесь вам необходимо дописать логику определения вирусного файла
func (u *Usecase) FindVirus([]models.File) models.File {
	return models.File{}
}
