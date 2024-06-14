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

type File = {
    name: string;
    size: number;
};

const sizeName = {
    kb: 2 ** 10,
    mb: 2 ** 20,
    gb: 2 ** 30,
    tb: 2 ** 40,
    pb: 2 ** 50,
};

const archives = ["tar", "zip", "apk", "7z"];

const regex = /file_.*_(\w+)_(\w{2}).(\w+)/;

function findViruses(files: File[]): string[] {
    let viruses: string[] = [];

    files.forEach((file) => {
        const matches = regex.exec(file.name) ?? [];

        let count = parseInt(matches[1]);
        let size = sizeName[matches[2] as string];
        if (file.size != count * size) {
            viruses.push(file.name);
        }
    });

    return viruses;
}

export const thirdAnswer: () => Promise<void> = async () => {
    const x_team_name = localStorage.getItem("X-TEAM-NAME");
    const files: File[] = await axiosInstanse.get("/master/get_files").then((res) => res.data);
    let viruses: string[] = findViruses(files);
    axiosInstanse.post("/dev/find_viruses", viruses, { headers: { "X-TEAM-NAME": x_team_name } });

    for (let file of files) {
        const matches = regex.exec(file.name) ?? [];
        const file_ext = matches[3];

        if (!archives.includes(file_ext)) {
            continue;
        }

        const resp = await axiosInstanse.post(
            "/master/unpack",
            { name: file.name },
            {
                headers: { "X-TEAM-NAME": x_team_name },
            },
        );

        if (resp.status != 200) {
            continue;
        }

        let new_files = resp.data;
        viruses = findViruses(new_files);
        axiosInstanse.post("/dev/find_viruses", viruses, { headers: { "X-TEAM-NAME": x_team_name } });
    }
};
