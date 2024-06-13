export type TaskLevel = 'easy' | 'medium' | 'hard'
export type TaskKey = 'boots' | 'news' | 'malware' | 'websocket'
export type TaskStatus = { basic: boolean, advance: boolean, secret: boolean }

export interface Task {
  key: TaskKey,
  href: string,
  icon: string,
  level: TaskLevel,

  title: string,
  description: string,
  subTasks?: {
    basic: string,
    advance: string,
    endpoints: string,
  },
  spoilers?: Array<{ title: string, href?: string }>
}

export const tasks: Array<Task> = [
  {
    title: 'Обуй героя',
    description: 'Получите информацию о том какая сегодня погода, чтобы надеть правильную обувь.',
    icon: '/images/boots.png',
    href: '/tasks/boots',
    key: 'boots',
    level: 'easy',
    subTasks: {
      basic: 'Вам нужно получить от сервера текущую погоду. Выбрать подходящую обувь для данной погоды. И одеть ее на персонажа.',
      advance: 'Вам нужно получить от сервера погоду для конкретного города. Город задается через квери-параметр city. Вы едете в Emerald (Изумрудный город).',
      endpoints: "Погода - очень переменчивое явление. Может обновлятся даже каждую минуту."
    },
    spoilers: [
      {
        title: 'Шпаргалка по axios. Как отправлять запросы с Fe',
        href: 'https://my-js.org/docs/cheatsheet/axios/#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D0%BE%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D0%B8-get-%D0%B8-post-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%BE%D0%B2'
      },
      {
        title: 'Официальная документация axios.',
        href: 'https://axios-http.com/ru/docs/req_config'
      }
    ]
  },
  {
    title: 'Безопасные новости',
    description: 'Проверьте новые новости и удалите: запрещенные слова и персональные данные.',
    icon: '/images/news.png',
    href: '/tasks/news',
    key: 'news',
    level: 'easy',
    subTasks: {
      basic: 'Вам нужно получить от сервера новость и запрещенное слово, которое могло в них просочиться. Вам нужно удалить запрещенное слово. И отправить полученный результат назад.',
      advance: "Вам также нужно удалить персональную информацию из новости, если они там есть. Возможнный формат: [password | secret | token]=\"значение\"",
      endpoints: "Только красивые новости оседают в сердцах людей..."
    },
    spoilers: [
      {
        title: 'Удалять запрещенные слова и и персональную информацию советуем с использованием регулярных выражений.',
      },
      {
        title: 'Шпаргалки по регуляркам',
        href: 'https://learn.javascript.ru/regular-expressions'
      },
      {
        title: 'Песочница для регулярок',
        href: 'https://regex101.com/'
      }
    ]
  },
  {
    title: 'Уничтожить вирусы',
    description: 'Коварный вирус затаился среди ваших файлов, но вы недремлите и готовы искоренить зло.',
    icon: '/images/swords.png',
    href: '/tasks/malware',
    key: 'malware',
    level: 'medium',
    subTasks: {
      basic: 'Вам нужно получить от сервера список файлов. Найти среди них файлы-вирусы и удалить их. Вирусные файлы можно опознать по нестандартному размеру или наименованию файла.',
      advance: 'Среди файлов может встретится архив. Вам нужно распаковать его и проверить на вирусы. Архив можно опредилить по расширению файла.',
      endpoints: "Вглядитесь в пучину файлов, возможно там вы сможете найти для себя что-то новое."
    },
    spoilers: [
      {
        title: 'Поиск по массиву',
        href: 'https://learn.javascript.ru/array-methods#find-i-findindex-findlastindex'
      },
      {
        title: 'Распространенные расширения имен файлов в Windows',
        href: 'https://www.google.com/search?q=%D0%BF%D0%BE%D0%BF%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D1%8B%D0%B5+%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D1%8F+%D0%B8%D0%BC%D0%B5%D0%BD+%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%BE%D0%B2&sca_esv=e912ca26f44d8cea&sxsrf=ADLYWIL2VlMaiizqLmyltuWuWUf2-1cdCw%3A1718275206882&ei=hsxqZtHANYqRwPAP8biN8Ao&udm=&ved=0ahUKEwjRm9T6sdiGAxWKCBAIHXFcA64Q4dUDCBA&uact=5&oq=%D0%BF%D0%BE%D0%BF%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D1%8B%D0%B5+%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D1%8F+%D0%B8%D0%BC%D0%B5%D0%BD+%D0%B0%D1%80%D1%85%D0%B8%D0%B2%D0%BE%D0%B2&gs_lp=Egxnd3Mtd2l6LXNlcnAiQdC_0L7Qv9GD0LvRj9GA0L3Ri9C1INGA0LDRgdGI0LjRgNC10L3QuNGPINC40LzQtdC9INCw0YDRhdC40LLQvtCyMggQABiABBiiBDIIEAAYogQYiQUyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIzxJQ0gNYmxFwA3gBkAEAmAHzAqAB0QqqAQcwLjMuMS4yuAEDyAEA-AEBmAIGoAKMBMICChAAGLADGNYEGEfCAgcQIxiwAhgnmAMAiAYBkAYIkgcDMy4zoAfmMg&sclient=gws-wiz-serp'
      }
    ]
  },
  {
    title: 'Космический пинг понг',
    description: 'Обеспечте вашего персонажа событиями реального времени для оперативного реагирования на угрозы.',
    icon: '/images/websocket.png',
    href: '/tasks/websocket',
    key: 'websocket',
    level: 'hard',
    subTasks: {
      basic: 'Вам нужно подключить веб приложение к вебсокету.',
      advance: 'Вам нужно досчитать до 100 по очереди fe-be-fe-be.',
      endpoints: "Для проверки задания позовите экспертов."
    },
    spoilers: [
      {
        title: 'Шпаргалка по Websocket',
        href: 'https://learn.javascript.ru/websocket'
      },
      {
        title: 'Шпаргалка по useEffect',
        href: 'https://react.dev/reference/react/useEffect'
      }
    ]
  },
]

export type Boots = 'Сланцы' | 'Галоши'| 'Валенки' | 'Кроссовки' | 'Башмачки'
export type Weather = 'Солнечно' | 'Дождливо' | 'Снежно' | 'Пасмурно' | 'Отлично'

export const bootForWeather: Record<Weather, Boots>  = {
  'Солнечно': 'Сланцы',
  'Дождливо': 'Галоши',
  'Снежно': 'Валенки',
  'Пасмурно': 'Кроссовки',
  'Отлично': 'Башмачки'
}
