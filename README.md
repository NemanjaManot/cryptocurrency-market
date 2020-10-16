# Crypto Currency Market

## About app

NextJS application that presents currency market information and allows user to create price alerts.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application flow

At first screen user gets information about currencies in table view. User has ability to sort table data by any column.
In table footer, user has option to use pagination and also choose how many items per page he wants to see.
Search by symbol name is also included.

On every 5 minutes re-fetch is happening (with mocked data).

All data is stored in LocalStorage.

On second screen **/Alert**, user can create price alert for symbols (only symbols which have average prop).
If average is between min and max price which user chose - alert will be shown above the table.
This is also stored in LocalStorage. User has ability to delete all alerts.

### Libraries

- react
- nextjs
- material-ui
- prettier
