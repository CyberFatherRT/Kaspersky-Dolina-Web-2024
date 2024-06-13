/**
 * Безопасные новости
 * 
 * Endpoints:
 * 
 * Get /master/get_news - получение новости с проверяющего BE. 
 * 
 * Post /dev/validate_news body: {news: ''} - отправка новости на публикацию.
 * Отправка происходит на локальный BE и там с ней можно провести дополнительные манипуляции
 * И потом нужно отправить на проверяющий BE.
 * 
 */

import { axiosInstanse } from "@/shared/utils"


export const secondAnswer: () => Promise<void> = async () => {
}
