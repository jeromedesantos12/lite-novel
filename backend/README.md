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
- req.params = {} -> pokoknya bawaan dari si express

- req.file = undefined -> jadi pakai req.file?.path
