function calcNewton1() {
    const F = parseFloat(document.getElementById("n1_force").value);
    const result = document.getElementById("n1_result");

    if (isNaN(F)) {
        result.textContent = "Masukkan nilai gaya terlebih dahulu.";
        return;
    }

    if (F === 0) {
        result.textContent = "Benda akan tetap diam atau bergerak lurus beraturan (ΣF = 0).";
    } else {
        result.textContent = "Resultan gaya tidak nol, benda mengalami percepatan.";
    }
}

function calcNewton2() {
    const m = parseFloat(document.getElementById("n2_mass").value);
    const a = parseFloat(document.getElementById("n2_acc").value);
    const result = document.getElementById("n2_result");

    if (isNaN(m) || isNaN(a)) {
        result.textContent = "Masukkan nilai massa dan percepatan.";
        return;
    }

    const F = m * a;
    result.textContent = `Gaya total: ${F} N`;
}

function calcNewton3() {
    const F = parseFloat(document.getElementById("n3_force").value);
    const result = document.getElementById("n3_result");

    if (isNaN(F)) {
        result.textContent = "Masukkan gaya aksi terlebih dahulu.";
        return;
    }

    result.textContent = `Gaya reaksi = ${F} N (berlawanan arah)`;
}
