// File: scripts.js

// 1. Fade-in effect on scroll
document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    fadeInElements.forEach(element => observer.observe(element));
});

// 2. Smooth scrolling for navigation links
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Carousel
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#image-carousel', {
      type       : 'loop',
      perPage    : 3,
      focus      : 'center',
      gap        : '1rem',
      autoplay   : true,
      interval   : 3000,
      breakpoints: {
        768: {
          perPage: 1,
        },
        1024: {
          perPage: 2,
        },
      },
    }).mount();
  });

// Toggle the visibility of the navbar
function toggleNavbar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle the visibility of the navbar
function toggleNavbar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle the visibility of the navbar and overlay
function toggleNavbar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.toggle('active'); // Activa/desactiva el navbar
    overlay.classList.toggle('active'); // Activa/desactiva el fondo
}

// Close the navbar when clicking on the overlay
function closeNavbar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.remove('active'); // Oculta el navbar
    overlay.classList.remove('active'); // Oculta el fondo
}

// Obtener elementos del DOM
const searchButton = document.getElementById('searchButton');
const closeSearchModal = document.getElementById('closeSearchModal');
const searchModal = document.getElementById('searchModal');
const startSearchBtn = document.getElementById('startSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Asegurar que el modal esté oculto al cargar la página
if (searchModal) {
    searchModal.style.display = 'none';
}

// Lista de páginas donde buscar IDs
const pagesToSearch = [
    'index.html',
    'business/categories/vestuario.html',
    'business/categories.html',
];

// Verificar si los elementos existen antes de añadir eventos
if (searchButton && searchModal) {
    searchButton.addEventListener('click', () => {
        searchModal.style.display = 'flex';
    });

    closeSearchModal.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });
}

// Normalizar IDs (eliminar espacios y convertir a minúsculas)
function normalizeId(id) {
    return id ? id.toLowerCase().replace(/\s+/g, '') : '';
}

// Buscar ID en múltiples páginas con coincidencias parciales y mejor presentación
async function searchIdInPages(query) {
    if (!searchResults) return;
    
    searchResults.innerHTML = "<p>🔍 Buscando...</p>";
    const normalizedQuery = normalizeId(query);
    let results = [];

    console.log("🔎 Iniciando búsqueda de:", normalizedQuery);

    for (const page of pagesToSearch) {
        try {
            console.log(`📄 Buscando en: ${page}...`);
            const response = await fetch(page);
            if (!response.ok) {
                console.warn(`⚠️ No se pudo cargar ${page}`);
                continue; // Si la página no carga, saltar
            }

            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');

            // Buscar todos los elementos con ID
            const allElements = doc.querySelectorAll('[id]');
            console.log(`🔍 Encontrados ${allElements.length} elementos`);

            allElements.forEach(el => {
                if (normalizeId(el.id).includes(normalizedQuery)) { // 🔥 Ahora busca coincidencias parciales
                    console.log(`✅ Coincidencia encontrada`);
                    results.push(`
                        <div class="result-item">
                            <a href="${page}#${el.id}" class="result-link" onclick="closeSearchModalFunction()">
                                <strong>${el.id.toUpperCase()}</strong> encontrado
                            </a>
                        </div>
                    `);
                }
            });

        } catch (error) {
            console.error(`❌ Error al cargar ${page}:`, error);
        }
    }

    // Mostrar los resultados en el modal con mejor diseño
    searchResults.innerHTML = results.length > 0 
        ? results.join('') 
        : "<p>❌ No se encontró ningún resultado.</p>";
}

// Función para cerrar el modal al hacer clic en un resultado
function closeSearchModalFunction() {
    if (searchModal) {
        searchModal.style.display = 'none';
    }
}

// Evento al hacer clic en "Iniciar Búsqueda"
if (startSearchBtn && searchInput) {
    startSearchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchIdInPages(query);
        } else {
            alert('Por favor, ingresa un término de búsqueda.');
        }
    });
}


let deferredPrompt;

// Selecciona el botón que activará la instalación manualmente
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.display = 'block'; // Muestra el botón si es posible instalar
});

// Evento al hacer clic en el botón de instalación
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
            console.log('Usuario instaló la PWA');
        } else {
            console.log('Usuario canceló la instalación');
        }

        deferredPrompt = null; // Reinicia la variable
    }
});





function setupModals() {
    console.log("Modales listos");
}
// Initialize all functions
smoothScroll();
setupModals();
