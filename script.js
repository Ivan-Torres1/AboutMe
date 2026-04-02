// ── Alternador de Tema (Modo Oscuro/Claro) ────────────────────────────
const html = document.documentElement;
const themeBtn = document.querySelector('[aria-label="Cambiar tema"]');
const themeIcon = themeBtn.querySelector('.material-symbols-outlined');

function applyTheme(dark) {
    if (dark) {
        html.classList.add('dark');
        themeIcon.textContent = 'light_mode';
    } else {
        html.classList.remove('dark');
        themeIcon.textContent = 'dark_mode';
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Restaurar la preferencia guardada (por defecto: oscuro)
const saved = localStorage.getItem('theme');
applyTheme(saved ? saved === 'dark' : true);

themeBtn.addEventListener('click', () => {
    applyTheme(!html.classList.contains('dark'));
});

// ── Formulario de Contacto → mailto ───────────────────────────────────
const form = document.querySelector('form');
const submitBtn = form.querySelector('button[type="submit"]');
const TARGET_MAIL = 'fabriziotorres111@gmail.com';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación básica
    if (!name || !email || !message) {
        showToast('Por favor, completa todos los campos.', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
    }

    const subject = encodeURIComponent(`Contacto desde Portafolio – ${name}`);
    const body = encodeURIComponent(
        `Nombre: ${name}\nCorreo: ${email}\n\n${message}`
    );

    // Abrir cliente de correo por defecto
    window.location.href = `mailto:${TARGET_MAIL}?subject=${subject}&body=${body}`;

    // Feedback visual
    submitBtn.disabled = true;
    submitBtn.textContent = '✓ Abriendo tu cliente de correo…';
    submitBtn.classList.add('opacity-75');

    setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensaje';
        submitBtn.classList.remove('opacity-75');
        showToast('¡Cliente de correo abierto! 🎉', 'success');
    }, 2500);
});

// ── Notificaciones Toast ──────────────────────────────────────────────
function showToast(msg, type) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    const bg = type === 'success'
        ? 'bg-green-500'
        : 'bg-red-500';

    toast.className = `fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-white text-sm font-semibold shadow-lg ${bg} transition-all duration-300 opacity-0 scale-95`;
    toast.textContent = msg;
    document.body.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
        toast.classList.remove('opacity-0', 'scale-95');
        toast.classList.add('opacity-100', 'scale-100');
    });

    // Animar salida después de 3s
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'scale-100');
        toast.classList.add('opacity-0', 'scale-95');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}