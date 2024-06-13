/**
 * Уничтожить вирусы
 * 
 * Endpoints: 
 * 
 * Get /master/get_files - получение списка файлов с проверяющего BE.
 * 
 * Post /dev/find_viruses - поиск вирусов среди файлов.
 * Имплементация удаления предполагается на локальном BE.
 * 
 * Post /master/unpack body fileData - распаковка выбранного файла на проверяющем BE.
 * В ответ он пришлет все файлы что есть.
 * 
 */

import { axiosInstanse } from "@/shared/utils";

export const thirdAnswer: () => Promise<void> = async () => {

}