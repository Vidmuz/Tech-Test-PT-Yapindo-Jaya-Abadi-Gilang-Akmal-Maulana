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

## Keputusan teknis penting dan trade-off

### 1. Menggunakan Next.js App Router

Keputusan ini dipilih karena aplikasi memiliki struktur route yang jelas untuk halaman landing, pencarian, detail repository, dan detail user. App Router juga membuat pengelolaan layout dan metadata halaman lebih terstruktur.

Trade-off:
- Kelebihan: struktur routing lebih modern dan modular.
- Kekurangan: memerlukan pola pengembangan yang lebih disiplin agar route dan data fetching tetap konsisten.

### 2. Menggunakan TanStack Query untuk semua fetching data

Semua data GitHub diambil melalui hook feature yang berbasis React Query. Ini memberi keuntungan berupa cache, stale time, retry policy, dan kemampuan infinite query.

Trade-off:
- Kelebihan: pengelolaan data remote menjadi lebih mudah dan performa lebih baik.
- Kekurangan: menambah lapisan abstraction dibandingkan fetch biasa, tetapi ini sebanding dengan kompleksitas aplikasi.

### 3. Menyimpan state pencarian pada URL query parameter

Search param seperti `q`, `type`, `sort`, `order`, dan `language` dipakai untuk menjaga state hasil pencarian tetap shareable dan bisa di-refresh kembali.

Trade-off:
- Kelebihan: URL berfungsi sebagai sumber state yang mudah dibagikan.
- Kekurangan: logika update query parameter harus dikelola dengan hati-hati agar tidak merusak state UI.

### 4. Menggunakan reusable UI component untuk loading, empty, dan error

Component seperti `SkeletonCard`, `EmptyState`, dan `ErrorState` dipakai berulang pada halaman search dan detail.

Trade-off:
- Kelebihan: konsistensi UX lebih baik, dan pengembangan lebih cepat.
- Kekurangan: component reusable perlu dirancang agar fleksibel, karena satu component bisa dipakai di banyak konteks.

### 5. Menggunakan render README langsung di UI

README repository diproses dengan `react-markdown`, `remark-gfm`, dan `rehype-highlight` agar konten markdown bisa tampil rapi di halaman detail repository.

Trade-off:
- Kelebihan: pengalaman eksplorasi repositori terasa lengkap.
- Kekurangan: README yang sangat besar bisa membuat halaman tampak padat dan perlu optimisasi pengelolaan layout.

## Hal yang akan saya tambahkan atau perbaiki jika punya waktu lebih

- Menambahkan fitur search autocomplete dan history pencarian terakhir.
- Menambahkan pagination manual selain infinite scroll agar pengalaman navigasi lebih eksplisit.
- Menambahkan caching hasil API yang lebih detail dan strategi prefetch pada halaman detail.
- Menambahkan unit test dan integration test untuk service dan hook.
- Menambahkan debounce yang benar-benar dipakai pada input search agar request lebih efisien.
- Menambahkan fitur bookmark atau favorit repository/user.
- Menambahkan error fallback yang lebih baik untuk beberapa kasus rate limit dan response GitHub yang tidak standar.

## Perkiraan waktu pengerjaan

Secara kasar, pengerjaan proyek ini memerlukan waktu sekitar:

- **Persiapan project dan konfigurasi awal**: 1 jam
- **Pengembangan service, hooks, dan type data**: 2 jam
- **Pembuatan layout, komponen reusable, dan theme UI**: 2 jam
- **Pembuatan halaman pencarian dan detail**: 3 jam
- **Polishing, loading state, error handling, dan dokumentasi**: 1 jam

Total estimasi pengerjaan: **sekitar 9 jam** untuk versi yang sudah ada saat ini.



