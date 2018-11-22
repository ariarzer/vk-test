# UI дропдаун, который позволяет искать пользователей в длинном списке (до 10 000 записей)

### О каждом пользователе известно :
* имя
* фамилия
* строка с дополнительной информацией (название университета или места работы)
* ссылка на аватарку
    * генерируется [picsum](https://picsum.photos/)
    * при ошибке загрузки герерируется идентикон [@download/blockies](https://www.npmjs.com/package/@download/blockies)
* доменное имя страницы (https://vk.com/доменное_имя)

Данные списка распределены между клиентом и сервером. На клиенте хранится информация о части списка пользователей без доменных имен (например первая 1000 записей). На сервере хранится информация о всем списке.

Данные генерируются `postinstall` с помощью [faker](https://github.com/marak/Faker.js/). 

### Дропдаун позволяет:
- не пользуясь поиском скроллить по всему списку
- давать выбирать один или сразу несколько пользователей (параметр инициализации)
- отображать или не отображать аватарки пользователей в списке (параметр инициализации)
- использовать autocomplete для фильтрации пунктов списка по набранному префиксу (при этом фильтрация должна учитывать все варианты неправильной раскладки, т.е. Андрей Рогозов должен подсказываться по любой из четырех подстрок "рого", "hjuj", "rogo", кщпщ'')
- выполнять запрос на сервер для расширенного поиска в режиме реального времени (например при недостаточном количестве данных на клиенте)

### API
Для запроса на сервер реализован простой API, который по подстроке возвращает необходимые данные также с учетом неправильных раскладок. 

### Дизайн
За основу дизайна взят дропдаун из окна репоста записи. (польностью не реализован >_<)

## [Демо](https://vk-test-task.herokuapp.com/) 