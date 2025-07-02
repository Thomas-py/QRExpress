// QR Express - Sistema de Reputación Digital
// Scripts principales

// Inicialización de AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  });

  // Smooth scrolling para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer para animaciones personalizadas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

  // Configuración de partículas
  initParticles();
});

// Configuración de partículas de fondo
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": ["#22d3ee", "#06b6d4", "#0891b2"]
        },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 0.3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#22d3ee",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "bounce",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 200,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 200,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
}

// Función para manejo de formularios
function handleFormSubmit(event) {
  // No procesar el formulario de prueba gratuita (lo maneja formulario.js)
  if (event.target.id === 'pruebaForm') {
    return;
  }
  
  event.preventDefault();
  
  // Aquí puedes agregar la lógica para enviar el formulario
  // Por ejemplo, enviar a un endpoint o mostrar un mensaje de confirmación
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  console.log('Datos del formulario:', data);
  
  // Ejemplo de mensaje de confirmación
  alert('¡Gracias por tu consulta! Te contactaremos pronto.');
  
  // Limpiar formulario
  event.target.reset();
}

// Agregar event listeners a formularios
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
});

// Función para tracking de eventos (opcional)
function trackEvent(eventName, eventData = {}) {
  // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
  console.log('Evento:', eventName, eventData);
  
  // Ejemplo para Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

// Función para manejo de CTAs
function handleCTA(ctaType) {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page_section: getCurrentSection()
  });
}

// Función para obtener la sección actual
function getCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  for (let section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      return section.id;
    }
  }
  
  return 'unknown';
}

// Función para animaciones personalizadas
function addCustomAnimations() {
  // Animación para elementos con clase .custom-animate
  const customElements = document.querySelectorAll('.custom-animate');
  
  customElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// Inicializar animaciones personalizadas
document.addEventListener('DOMContentLoaded', addCustomAnimations);

// Función para lazy loading de imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading); 