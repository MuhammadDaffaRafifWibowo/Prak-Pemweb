function hitungNilai() {
    const bobotTugas = 0.25; // Bobot untuk nilai tugas (25%)
    const bobotUTS = 0.25; // Bobot untuk nilai UTS (25%)
    const bobotUAS = 0.5; // Bobot untuk nilai UAS (50%)
    const batasKelulusan = 60; // Batas kelulusan

    // Mengambil nilai dari input dan mengubahnya menjadi angka
    const nilaiTugas = parseFloat(document.getElementById("nilaiTugas").value);
    const nilaiUTS = parseFloat(document.getElementById("nilaiUTS").value);
    const nilaiUAS = parseFloat(document.getElementById("nilaiUAS").value);

    // Validasi input
    if (
        isNaN(nilaiTugas) || nilaiTugas < 0 || nilaiTugas > 100 ||
        isNaN(nilaiUTS) || nilaiUTS < 0 || nilaiUTS > 100 ||
        isNaN(nilaiUAS) || nilaiUAS < 0 || nilaiUAS > 100
    ) {
        tampilkanNilai("Input tidak valid. Pastikan semua nilai antara 0 dan 100.", "error"); // Tampilkan pesan error
        document.getElementById("hasil").textContent = ""; // Kosongkan hasil
        return; // Keluar dari fungsi
    }

    // Perhitungan kontribusi
    let kontribusiTugas = nilaiTugas * bobotTugas; // Kontribusi dari nilai tugas
    let kontribusiUTS = nilaiUTS * bobotUTS; // Kontribusi dari nilai UTS
    let kontribusiUAS = nilaiUAS * bobotUAS; // Kontribusi dari nilai UAS

    // Perhitungan nilai akhir
    let rataRataTertimbang = kontribusiTugas + kontribusiUTS + kontribusiUAS; // Rata-rata tertimbang

    // Menentukan nilai huruf
    let grade; // Variabel untuk nilai huruf
    if (rataRataTertimbang >= 90) {
        grade = "A"; // Nilai A jika rata-rata tertimbang >= 90
    } else if (rataRataTertimbang >= 80) {
        grade = "B"; // Nilai B jika rata-rata tertimbang >= 80
    } else if (rataRataTertimbang >= 70) {
        grade = "C"; // Nilai C jika rata-rata tertimbang >= 70
    } else if (rataRataTertimbang >= batasKelulusan) { // Menggunakan batas kelulusan yang telah didefinisikan
        grade = "D"; // Nilai D jika rata-rata tertimbang >= batas kelulusan
    } else {
        grade = "E"; // Nilai E jika rata-rata tertimbang < batas kelulusan
    }

    // Tentukan warna berdasarkan kelulusan dan tampilkan hasil di nilai
    const warnaHasil = (grade === "A" || grade === "B" || grade === "C") ? "green" : "red"; // Warna hijau jika lulus, merah jika tidak lulus
    const status = grade === "A" || grade === "B" || grade === "C" ? "Lulus" : "Gagal"; // Status lulus atau gagal

    // Tabel 1
    const tabelDetail = `
        <table border="1" cellpadding="5">
            <tr>
                <th>Keterangan</th>
                <th>Inputan</th>
                <th>Kontribusi</th>
            </tr>
            <tr>
                <td>Tugas</td>
                <td>${nilaiTugas}</td>
                <td>${kontribusiTugas.toFixed(2)}</td>
            </tr>
            <tr>
                <td>UTS</td>
                <td>${nilaiUTS}</td>
                <td>${kontribusiUTS.toFixed(2)}</td>
            </tr>
            <tr>
                <td>UAS</td>
                <td>${nilaiUAS}</td>
                <td>${kontribusiUAS.toFixed(2)}</td>
            </tr>
        </table>
    `;

    // Tabel 2
    const tabelHasil = `
        <table border="1" cellpadding="5">
            <tr>
                <th>Keterangan</th>
                <th>Hasil</th>
            </tr>
            <tr>
                <td>Rata-rata Tertimbang</td>
                <td>${rataRataTertimbang.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Grade</td>
                <td>${grade}</td>
            </tr>
            <tr>
                <td>Status</td>
                <td style="color: ${warnaHasil};">${status}</td>
            </tr>
        </table>
    `;

    // Gabungkan tabel
    const pesanHasil = tabelDetail + tabelHasil;

    document.getElementById("hasil").innerHTML = pesanHasil; // Tampilkan hasil

    // Tampilkan pesan di nilai dengan warna sesuai kelulusan
    if (grade === "A" || grade === "B" || grade === "C") {
        tampilkanNilai(`Selamat! Anda lulus dengan nilai ${grade}.`, "success"); // Tampilkan pesan lulus
    } else {
        tampilkanNilai(`Maaf, Anda tidak lulus. Nilai Anda adalah ${grade}.`, "error"); // Tampilkan pesan tidak lulus
    }
}

// Fungsi untuk menampilkan nilai dengan pesan dan warna latar belakang
function tampilkanNilai(pesan, status) {
    const kontenNilai = document.querySelector(".konten-nilai"); // Mengambil elemen konten nilai
    document.getElementById("pesanPopup").textContent = pesan; // Mengatur pesan popup

    // Atur warna latar belakang sesuai status
    kontenNilai.classList.remove("success", "error"); // Menghapus kelas sebelumnya
    kontenNilai.classList.add(status); // Menambahkan kelas baru

    document.getElementById("popupNilai").style.display = "block"; // Menampilkan popup
}

// Fungsi untuk menutup nilai
function tutupNilai() {
    document.getElementById("popupNilai").style.display = "none"; // Menutup popup
}
