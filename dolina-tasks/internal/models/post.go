package models

type News struct {
	News   string `json:"news"`
	Secret string `json:"secret"`
}

type NewsResponse struct {
	News string `json:"news"`
}
