# Getting Started with LOD BACKEND

Untuk .env sesuaikan dengan url api

Jalankan `npm i` untuk install dependency

Jalankan `npm install dotenv` khawatir tidak terinstall

Pastikan buat .env file dengan isi

```
DATABASE_URL="mysql://root:@localhost:3306/lod" => Hanya contoh untuk formatnya mysql://user:@host:port/db
JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SCKg2wVQSlrF2kBSHaelalFVroK9byCmagfIGAEQv_Q" => Bisa pakai saja langsung
```

Jalankan `npx prisma migrate dev --name innit` untuk migrasi pertama kali

### `npm run start`

Untuk dokumentasi API terdapat pada

```
https://documenter.getpostman.com/view/15617789/2s9Xy5NWmZ
```

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:9000](http://localhost:9000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
