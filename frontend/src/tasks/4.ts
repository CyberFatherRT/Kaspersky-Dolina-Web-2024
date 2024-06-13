/**
 * Связь с космосом
 *
 * Endpoints:
 *
 * ws://{your_local_api}:8080/api/tasks/ping - эндпоинт подключения к websocket
 * Вы должны подключится к вебсокету поднятому на вашем локальном BE.
 */

import { EffectCallback, useEffect } from "react";

// Данная функция нигде не вызывается в коде приложения
// Вам предстоить самим добавить вызов для страницы данного задания
// Возможно вам пригодится useEffect)
export const useWebsocket: EffectCallback = () => {
    useEffect(() => {
        let socket = new WebSocket("ws://localhost:8080/api/tasks/ping");
        let count = 0;

        socket.onopen = (_) => {
            console.log("Connection opened");
            socket.send("fe");
            count++;
        };

        socket.onmessage = (event) => {
            if (count == 100) {
                socket.close(1000);
                return;
            }

            if (event.data === "be") {
                socket.send("fe");
                count++;
            }
        };

        socket.onclose = (_) => {
            console.log("Connection closed");
        };
    }, []);
};
