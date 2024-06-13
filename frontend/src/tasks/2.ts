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

import { axiosInstanse } from "@/shared/utils";

export const secondAnswer: () => Promise<void> = async () => {
    const response = await axiosInstanse.get("/master/get_news");
    const { news, secret } = response.data;
    await axiosInstanse.post(
        "/dev/validate_news",
        { news: news, secret: secret },
        {
            headers: {
                "X-TEAM-NAME": localStorage.getItem("teamToken"),
            },
        },
    );
};
