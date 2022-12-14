## Bug & Resolve

Alasan memakai perintah asli mongodb (save, findByIdAndUpdate) bukan dari mongoose (insertOne, updateOne), adalah:

- Perintah findByIdAndUpdate, findByIdAndDelete (bawaan mongoose) mengembalikan isi dari data yang diubah, sedangkan untuk password sendiri kita maunya "private", mau bentuknya sudah di hashpun kalo bisa orang tidak berkepentingan tidak perlu lihat, sehingga lebih enak pakai insertOne, updateOne (bawaan mongodb) yang hanya mengembalikan informasi sederhana tentang berapa yang diubah.
- Sebenarnya masalah di atas bisa diatasi dengan membuang properti password pada object kembalian findByIdAndUpdate/findByIdAndDelete (const newUser = user.toObject(); delete newUser.password), namun bagaimana jika orang iseng itu mengutak-atik isi data JavaScript kita lalu langsung mengcapture si kembalian findByIdAndUpdate/findByIdAndDelete yang belum kita sanitize? yang masih ada object properti passwordnya.
- Masalah info "Apakah data tidak ada yang diubah?" (opsional), kalo pakai perintah asli mongoose langsung ngembaliin isi data tanpa informasi yang jelas tentang perubahan data

Kenapa cari dulu findById untuk validasi data apakah ada, padahalkan updateOne/deleteOne itu memang sudah nyari id dan kasih kembalian info detail juga sebagaimana kalau ternyata tidak ada yang sama dengan id yang diminta?

- Masalah logika, karena kegunaan findById juga sebagai validasi sebelum masuk ke perintah selanjutnya (seperti update & delete) sehingga kalau kita cuma mengambil informasi hasil dari kembalian si update/delete, itu berarti perintah update/deletenya udah jalan duluan baru kita kasih validasi meskipun memang tidak error di mongoose, tapi secara logika salah.
- Masalah removeImg, dia perlu data imagepath dari kembalian si findById (si imagepath lama bukan findByIdAndUpdate yang merupakan si imagepath baru hasil update), tanpa path removeImg tidak bisa dilakukan.

Perlukan me-return removeImg jika image tidak ketemu atau sudah dihapus?

- Perlu, tapi tidak harus sampai memberikan respond.status yang akan memberhentikan program, karena kalau image memang sudah ke buang, masa datanya tidak bisa dibuang sama sekali? kan sepele. Jadi lebih baik data tetap bisa dibuang.

Masalah req.body tidak terbaca pada saat sebelum upload image multer, jadi validasi gagal:

- Upload image dulu baru validasi, tapi kalo validasi tidak lolos image sudah terlanjur di upload.
- Solusi kalo validasi tidak lolos, hapus image! masalahnya: hapus image berdasarkan path apa? kan datanya aja belum ke simpan ke db.

Note untuk option chaining operator:

- req.body = {}
- req.query = {}
- req.params = {}
- req.cookies = {} -> pokoknya bawaan dari si express
- req.file = undefined -> jadi pakai req.file?.path

Jadi bug multer!

- multer bikin error route yang tidak pakai middleware multer, misal route post "/create" pakai imgUser (Middleware hasil promise multer) lalu route post "/login" yang tidak pakai imgUser, req body tidak terbaca/ req.body = {} (length 0)
- Begitu juga tadi entah kenapa req.body tidak terbaca pada saat sebelum upload image multer, jadi pas validasi gagal, hapus image (kerja 2x) harusnya kan validasi gagalin dulu sebelum sampai ke middleware imgUser alias multer

Jadi masalahnya disini!

- req body kebaca di raw -> JSON tapi tidak di form data (kecuali ditambahin middleware multer)
- penambahan "express.urlencoded()" juga cuma buat jalanin x-www-form-url-encoded
- solusi? buat reactnya dulu

Access token dipakai di:

- before login -> -verify (-AT) -> biar gak login 2x & gak sisain data history RT di db
- after login -> verify (AT) -> auth biasa aja

Refresh token dipakai di:

- login -> generate (RT) -> buat sekalian save ke db
- history -> verify (RT) -> buat dapet AT baru setelah verif RT

Ambil info dari user yang login:

- decode buat ambil data -> novel & logout (uid mana yg mau di hapus)
- ambil dari db(?) -> gak bisa, karena pakai akses dari mana? dari AT juga kan? mau ambil dari db lewat AT juga wkwkwkw
- mau nyari data berdasarkan apa? ya berdasarkan yang lagi login. yang lagi login siapa? ya yang lagi ninggalin cookies alias AT di dalamnya
- SALAH, tidak perlu di decode, cukup ambil req?.user saja dari si middleware verifyAccessToken

NEXT!

- Buat -verify before login
- Rute baru untuk si history table
- Jika exp maka auto jalanin si rute history buat minta AT lagi(?) tapi kan RT nya harus input dulu(?) atau bisa di auto panggil(?)
