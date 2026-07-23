# GitExplorer

GitExplorer adalah aplikasi pencarian dan eksplorasi repository serta profil pengguna GitHub yang dibuat dengan Next.js 15, React 19, TypeScript, TanStack Query, dan Framer Motion.

Aplikasi ini memungkinkan pengguna mencari repository atau pengguna GitHub, melihat detail repository, melihat profil user/organization, serta menampilkan README repository yang bisa dirender langsung di halaman.

## Fitur utama

- Pencarian repository dan user/organization melalui GitHub REST API
- Filter pencarian berdasarkan sort, urutan ascending/descending, dan bahasa pemrograman
- Infinite scroll untuk memuat hasil pencarian berikutnya secara berkelanjutan
- Halaman detail repository yang menampilkan:
  - statistik repository
  - ringkasan bahasa pemrograman
  - contributor teratas
  - README repository yang di-render
- Halaman detail user/organization yang menampilkan:
  - profil pengguna
  - statistik profil
  - repository terbaru milik user
- Toggle tema light/dark
- Skeleton loading, empty state, dan error state yang ramah pengguna

## Teknologi yang digunakan

- **Next.js 15** dengan App Router
- **React 19**
- **TypeScript**
- **TanStack Query** untuk fetching, caching, dan infinite query
- **Axios** untuk komunikasi ke GitHub REST API
- **Tailwind CSS** untuk styling UI
- **Framer Motion** untuk animasi
- **next-themes** untuk pengelolaan tema
- **react-markdown**, **remark-gfm**, dan **rehype-highlight** untuk render README Markdown

## Struktur project

```bash
app/                     Rute utama aplikasi (App Router)
  page.tsx               Halaman landing
  search/                Halaman pencarian
  repository/[owner]/[repo]/   Detail repository
  user/[username]/       Detail user/organization
components/              Komponen reusable UI
features/                Hook feature-scoped untuk data fetching
services/                Layer API GitHub
hooks/                   Hook umum seperti debounce dan intersection observer
lib/                     Query client, axios instance, animation variants, cn()
types/                   Tipe respons GitHub dan search/filter
constants/               Konstanta route dan pilihan filter
utils/                   Formatter dan helper warna bahasa
styles/                  Styling global
```

## Cara menjalankan project

1. Pastikan Node.js sudah terinstall.
2. Install dependency:

```bash
npm install
```

3. Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

4. Buka aplikasi di browser:

```bash
http://localhost:3000
```

## Konfigurasi environment

Aplikasi ini membaca token GitHub melalui variabel lingkungan `NEXT_PUBLIC_GITHUB_TOKEN` pada file `.env`.

Jika Anda ingin meningkatkan batas rate limit GitHub dari 60 request/jam menjadi 5.000 request/jam, tambahkan token GitHub personal access token pada file `.env`:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

> Token bersifat opsional, tetapi sangat disarankan jika ingin melakukan request dalam jumlah lebih besar.

## Cara penggunaan aplikasi

### 1. Mencari repository

- Buka halaman utama.
- Pilih tab `Repositories`.
- Ketik keyword seperti `react`, `nextjs`, atau `machine learning`.
- Tekan Enter atau submit search.
- Hasil akan tampil dalam grid, dan bisa difilter dengan:
  - sort berdasarkan `Best Match`, `Stars`, `Forks`, atau `Updated`
  - order `Ascending` atau `Descending`
  - bahasa pemrograman tertentu

### 2. Mencari user atau organization

- Pilih tab `Users` pada halaman pencarian.
- Masukkan username atau kata kunci yang ingin dicari.
- Hasil user akan ditampilkan dalam card.
- Klik card user untuk membuka halaman profil detail.

### 3. Melihat detail repository

- Klik card repository dari hasil pencarian.
- Halaman detail akan menampilkan:
  - nama owner dan repository
  - informasi visibility, fork, archive status
  - statistik stars, forks, watchers, dan open issues
  - breakdown bahasa program
  - contributor teratas
  - README repository

### 4. Melihat detail user atau organization

- Klik card user dari hasil pencarian.
- Halaman detail menampilkan:
  - avatar, nama, username, bio
  - informasi company, location, website, email, dan tanggal join
  - statistik followers, following, repositori, dan gists
  - daftar repository terbaru milik user tersebut

## Alur data aplikasi

Aplikasi mengekstrak data dari GitHub REST API melalui layer service di folder `services`. Data fetching dan caching dikelola oleh TanStack Query, sedangkan komponen UI membaca state dari hook feature seperti `useRepoSearch`, `useUserSearch`, `useRepoDetail`, dan `useUserDetail`.

### Endpoint utama yang digunakan

- `/search/repositories`
- `/search/users`
- `/repos/{owner}/{repo}`
- `/repos/{owner}/{repo}/languages`
- `/repos/{owner}/{repo}/contributors`
- `/repos/{owner}/{repo}/readme`
- `/users/{username}`
- `/users/{username}/repos`

## Manajemen state

State aplikasi dibagi menjadi:

- state UI lokal dengan React `useState`
- state URL query parameter untuk pencarian dan filter
- state server-side / remote data yang dikelola oleh TanStack Query
- state tema yang dikelola oleh `next-themes`

## Routing

Aplikasi memakai App Router Next.js dengan route berikut:

- `/` → halaman landing page
- `/search` → halaman hasil pencarian
- `/repository/[owner]/[repo]` → halaman detail repository
- `/user/[username]` → halaman detail user/organization

## State loading dan error handling

Aplikasi menyediakan pengalaman yang lebih baik untuk kondisi berikut:

- loading skeleton saat data sedang diambil
- empty state saat query tidak ada hasil
- error state saat request gagal, termasuk rate limit GitHub API atau tidak ada jaringan
- tombol retry pada error state



