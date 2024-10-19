document.addEventListener('DOMContentLoaded', (event) => {
    const overlay = document.querySelector('.page-transition-overlay');

    // Fungsi untuk menangani transisi keluar
    const transitionOut = (e, href) => {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => {
            window.location.href = href;
        }, 500); // Sesuaikan dengan durasi transisi CSS
    };

    // Tambahkan event listener ke semua link internal
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
            link.addEventListener('click', (e) => transitionOut(e, href));
        }
    });

    // Animasi saat halaman dimuat
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.classList.remove('active');
        }
    });

    // Sembunyikan overlay setelah halaman dimuat
    window.addEventListener('load', () => {
        overlay.classList.remove('active');
    });
});

window.addEventListener('load', () => {
    document.body.classList.remove('fade-out');
});