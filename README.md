# 📘 Panduan Operasional Server Backend BeautyBrand

Dokumen ini berisi standar operasional untuk mengelola server backend API (FastAPI) di VPS SumoPod (Ubuntu).

---

## ⚙️ BAGIAN 1: Manajemen Server dengan PM2

PM2 adalah pengelola proses (Process Manager) yang menjaga API Anda tetap menyala 24/7 di latar belakang. Semua perintah ini dijalankan di terminal VPS Anda.

- **Melihat Status Server (Cek apakah API menyala atau mati):**

  ```bash
  pm2 list
  ```

  _(Jika status `online` berwarna hijau, server aman. Jika `errored` merah, server mati)._

- **Melihat Log dan Pesan Error (Sangat Penting):**

  ```bash
  pm2 logs beautybrand-api
  ```

  _(Gunakan ini jika status PM2 error untuk melihat baris kode mana yang rusak)._

- **Merestart Server (Wajib setelah update kode):**

  ```bash
  pm2 restart beautybrand-api
  ```

- **Mematikan Server Sementara:**

  ```bash
  pm2 stop beautybrand-api
  ```

- **Menghapus Server dari PM2 (Jika ingin setup ulang dari awal):**

  ```bash
  pm2 delete beautybrand-api
  ```

- **Menyimpan Konfigurasi Permanen (Agar otomatis menyala saat VPS ter-restart):**
  ```bash
  pm2 save
  ```

---

## 🔄 BAGIAN 2: Memperbarui Kode di Server (Update dari GitHub)

Lakukan 4 tahapan ini secara berurutan setiap kali Anda selesai melakukan _push_ kode baru (perbaikan bug, penambahan fitur) dari laptop Anda ke GitHub.

**1. Masuk ke Direktori Proyek**
Pastikan Anda berada di folder yang tepat:

```bash
cd ~/backend_beautybrand
```

**2. Tarik Pembaruan dari GitHub**
Ambil versi kode terbaru (sesuaikan `main` jika nama branch Anda `master`):

```bash
git pull origin main
```

**3. Perbarui Pustaka/Library (Opsional)**
_Hanya lakukan ini jika_ Anda menambahkan library baru di file `requirements.txt`. Jika tidak ada, lewati langkah ini.

```bash
source venv/bin/activate
pip install -r requirements.txt
```

**4. Restart Server & Verifikasi**
Terapkan kode baru ke dalam memori PM2 dan pastikan tidak ada error:

```bash
pm2 restart beautybrand-api
pm2 logs beautybrand-api
```

---

## 🗄️ BAGIAN 3: Pengecekan Database SQLite (`beautybrain.db`)

Pilih salah satu metode di bawah ini untuk melihat riwayat obrolan atau data yang masuk ke dalam database Anda.

### Metode A: Cek Cepat via Terminal VPS

Gunakan untuk pengecekan kilat tanpa mengunduh file.

1. Masuk ke folder: `cd ~/backend_beautybrand`
2. Buka database: `sqlite3 beautybrain.db`
3. Lihat daftar tabel: `.tables`
4. Lihat isi data dari sebuah tabel (contoh tabel `users`): `SELECT * FROM users;`
5. Keluar dari mode SQLite: `.quit`

### Metode B: Cek Visual Menggunakan Laptop (Direkomendasikan)

Gunakan metode ini untuk menganalisis dan mengelola data seperti di Microsoft Excel.

1. Buka aplikasi **FileZilla** atau **WinSCP** di laptop Anda.
2. Login ke VPS menggunakan IP (`43.133.133.149`), username (`ubuntu`), dan password panel Anda (Port: `22`).
3. Masuk ke direktori `/home/ubuntu/backend_beautybrand`.
4. Tarik / unduh file `beautybrain.db` ke laptop Anda.
5. Buka aplikasi **DB Browser for SQLite** di laptop, lalu buka file tersebut dan masuk ke tab **Browse Data**.
