# BooksNYT
BooksNYT - приложение для поиска книг. 
Здесь вы можете узнать о книжных новинках, а также найти информацию по приобретению понравившейся книги.  
В приложении используется [Books API](https://developer.nytimes.com/docs/books-product/1/overview)
В разработке приложения использовалась библиотека react-hook-forms - для валидации форм.

### Обязательные требования

- [x] Реализованы Требования к функциональности.
- [ ] Для хранения учетных записей пользователей, их Избранного и Истории поиска, не используется LocalStorage (используется Firebase)

 #### React

- [x] Функциональные компоненты c хуками в приоритете над классовыми.
- [x] Разделение на умные и глупые компоненты:
- [x] Реализован рендеринг списков
- [x] Реализована хотя бы одна форма
- [x] Есть применение Контекст API
- [x] Есть применение предохранителя (ErrorBoundary)
- [x] Есть хотя бы один кастомный хук
- [x] Хотя бы несколько компонентов используют PropTypes: [Item](https://github.com/Ksenia-Kladova/BooksNYT/tree/create-page-home/booksNYT/src/components/item), [List](https://github.com/Ksenia-Kladova/BooksNYT/blob/create-page-home/booksNYT/src/components/list/List.jsx)
- [x] Поиск не должен триггерить много запросов к серверу
- [x] Есть применение lazy + Suspense
#### Redux

- [x] Используется Modern Redux with Redux Toolkit
- [x] Используются слайсы
- [ ] Есть хотя бы одна кастомная мидлвара (не сделано)
- [x] Используется RTK Query
- [x] Используется Transforming Responses
### Необязательные требования

- [x] Используется TypeScript.
- [x] Используется Firebase
