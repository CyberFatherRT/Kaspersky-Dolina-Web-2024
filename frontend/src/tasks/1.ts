/**
 * Обуй героя
 *
 * Endpoints:
 *
 * Get /dev/weather - получение погоды c локального BE.
 * Нужно настроить проксирование на проверяющий.
 *
 * Post /master/weather body: { boots: 'Air max'}
 * Применение выбранной обуви на персонажа.
 *
 */

// инстанс axios
import { axiosInstanse } from "@/shared/utils";
// маппинг ботинок на погоду
import { bootForWeather } from "@/shared/models";

export const firstAnswer: () => Promise<void> = async () => {
    const weather = await axiosInstanse.get("/dev/weather?city=Emerald");
    const boots = bootForWeather[weather.data.weather];
    axiosInstanse.post("/master/weather", { boots: boots });
};
