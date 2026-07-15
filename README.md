# Word Collection UI

An Angular 20 web application that allows users to manage a collection of words by their word types.

The application consumes the ASP.NET Core REST API.

---

## Features

- Display all words
- Create new word
- Edit word
- Delete word
- Search by word
- Filter by word type
- Pagination
- Loading indicators
- Bootstrap UI
- Responsive design

---

## Technology Stack

- Angular 20
- TypeScript
- Bootstrap 5
- RxJS
- Angular Forms
- Angular Router

---

## Screens

- Home
- Add Word
- Edit Word

---

## Project Structure

```
src/
│
├── app/
│   ├── DTOs/
│   │
│   ├── models/
├   |── modules/components
│   │
│   ├── services/
│   │
│   └── app.routes.ts
│
├── environments/
│
└── styles.css
```

---

## Getting Started

Clone repository

```bash
git clone https://github.com/phiwe-saba/word-collection-ui.git
```

Install packages

```bash
npm install
```

Run application

```bash
ng serve
```

Navigate to

```
http://localhost:4200
```

---

## Functionality

### Home

- View words
- Search
- Filter
- Pagination

<img width="1732" height="757" alt="image" src="https://github.com/user-attachments/assets/eac3ce54-e5f6-43e5-b075-f6c3691dfbc2" />

### Add

- Create new word
<img width="1853" height="531" alt="image" src="https://github.com/user-attachments/assets/4d6d403b-1dab-4ee8-afe6-99550784a106" />

### Edit

- Update existing word
<img width="1741" height="536" alt="image" src="https://github.com/user-attachments/assets/f4fdb535-c887-4f24-944a-cb969d1d8fdf" />

### Delete

- Remove word
<img width="1832" height="532" alt="image" src="https://github.com/user-attachments/assets/8bf985f4-e925-401a-841a-a9a588997787" />

---

## CI/CD

GitHub Actions automatically:

- Install dependencies
- Build Angular
- Run tests

---

## Future Improvements

- Authentication
- Toast Notifications
- Lazy Loading
- Unit Tests

---

## Author

Sibulele Saba
