# Expense Tracker (Frontend)

React (Vite) + Tailwind CSS + Redux Toolkit + Axios. Mobile-friendly UI for adding, viewing, editing, deleting and filtering daily expenses. Data is stored by the backend in MongoDB.

## Features
- Add, edit and delete expenses with a confirm dialog before deleting
- Filter by category (Food, Transport, Shopping, Other) without changing stored data
- Total of currently displayed expenses, expense count and this-month total
- Spending-by-category breakdown (bonus)
- Client-side validation (title required, amount > 0, date required)
- Loading skeletons, empty state, success toasts and error states with retry

## Folder structure (4 layers)
```
src/
  pages/      Expense.jsx            -> screen, connects everything
  components/ ExpenseForm, ExpenseList, SummaryCards, CategoryFilter,
              CategoryBreakdown, ConfirmModal, Toast
  hook/       useExpense.js          -> wraps Redux for the UI
  state/      expense.slice.js, expense.state.js, store.js
  service/    expense.service.js     -> Axios API calls
  utils/      format.js              -> currency / date helpers
```

## Run locally
```bash
npm install
cp .env.example .env     # set VITE_API_URL to your backend
npm run dev
```
The app runs on http://localhost:5173. Start the backend first (default http://localhost:3000).

## Production build
```bash
npm run build
npm run preview
```

## Backend endpoints used
Base URL = `VITE_API_URL` (default `http://localhost:3000/api/expense`)

| Action | Method | Path |
| ------ | ------ | ---- |
| Create | POST   | `/create` |
| List   | GET    | `/get` |
| Update | PATCH  | `/update/:id` |
| Delete | DELETE | `/delete/:id` |

Responses are expected as `{ message, expense }` (the list endpoint returns the array under `expense`). Change paths in `src/service/expense.service.js` if your routes differ.

## Notes
- The backend must enable CORS for `http://localhost:5173`.
- Category names in `src/state/expense.state.js` must match the enum in your Mongoose model.
