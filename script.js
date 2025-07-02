// QR Express - Sistema de Reputación Digital
// Scripts principales

// Inicializar EmailJS con tu User ID
if (typeof emailjs !== 'undefined') {
  emailjs.init("y99EduzXQSRNo5N45");
}

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

  // Manejar el envío del formulario de contacto igual que el de prueba gratuita
  const contactoForm = document.getElementById('contactoForm');
  if (contactoForm) {
    contactoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = contactoForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '⏳ Enviando...';
      submitBtn.disabled = true;

      // Recopilar datos por ID
      const data = {
        nombre: contactoForm.querySelector('#contactoNombre').value,
        negocio: contactoForm.querySelector('#contactoNegocio').value,
        email: contactoForm.querySelector('#contactoEmail').value,
        consulta: contactoForm.querySelector('#contactoConsulta').value,
        fecha: new Date().toLocaleString('es-AR')
      };

      // Configuración de EmailJS
      const templateParams = {
        Nombre: data.nombre,
        Negocio: data.negocio,
        email: data.email,
        Consulta: data.consulta,
        fecha: data.fecha
      };

      if (typeof emailjs !== 'undefined') {
        emailjs.send('service_vhhj7ug', 'template_xdk5cdn', templateParams)
          .then(function(response) {
            mostrarMensajeExitoContacto();
            contactoForm.reset();
          }, function(error) {
            console.error('Error EmailJS:', error);
            alert('No se pudo enviar la consulta. Intentalo más tarde.');
          })
          .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          });
      } else {
        alert('No se pudo enviar la consulta. Intentalo más tarde.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
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

  // Detectar si es el formulario de contacto
  if (event.target.closest('section#contacto')) {
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Enviando...';
    submitBtn.disabled = true;

    // Recopilar datos
    const data = {
      Nombre: form.querySelector('input[placeholder="Nombre"]').value,
      Negocio: form.querySelector('input[placeholder="Negocio"]').value,
      Email: form.querySelector('input[placeholder="Email"]').value,
      Consulta: form.querySelector('textarea[placeholder="Consulta"]').value
    };

    // Configuración de EmailJS
    const templateParams = {
      Nombre: data.Nombre,
      Negocio: data.Negocio,
      Consulta: data.Consulta,
      email: data.Email
    };

    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_vhhj7ug', 'template_xdk5cdn', templateParams)
        .then(function(response) {
          mostrarMensajeExitoContacto();
          form.reset();
        }, function(error) {
          console.error('Error EmailJS:', error);
          alert('No se pudo enviar la consulta. Intentalo más tarde.');
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    } else {
      alert('No se pudo enviar la consulta. Intentalo más tarde.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
    return;
  }
  
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

// Función para mostrar mensaje de éxito del formulario de contacto
function mostrarMensajeExitoContacto() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  `;
  modal.innerHTML = `
    <div style="
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
      text-align: center;
      color: white;
      font-family: 'Inter', sans-serif;
    ">
      <!-- Icono de éxito -->
      <div style="
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        background: linear-gradient(135deg, #10b981, #059669);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 2s infinite;
      ">
        <svg style="width: 40px; height: 40px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <!-- Título -->
      <h3 style="
        font-size: 2rem;
        font-weight: bold;
        color: #22d3ee;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #22d3ee, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      ">
        ¡Consulta enviada!
      </h3>
      <!-- Mensaje principal -->
      <p style="
        color: #d1d5db;
        margin-bottom: 1.5rem;
        line-height: 1.6;
        font-size: 1.1rem;
      ">
        Tu consulta fue enviada exitosamente. <span style=\"color: #22d3ee; font-weight: 600;\">Te responderemos a la brevedad</span>.
      </p>
      <!-- Información de contacto -->
      <div style="
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
      ">
        <div style="display: flex; justify-content: center; gap: 2rem;">
          <div style="text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📧</div>
            <p style="color: #10b981; font-size: 0.875rem; font-weight: 500;">Revisá tu email</p>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📱</div>
            <p style="color: #10b981; font-size: 0.875rem; font-weight: 500;">Te contactaremos pronto</p>
          </div>
        </div>
      </div>
      <!-- Información adicional -->
      <div style="
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 2rem;
      ">
        <p style="color: #3b82f6; font-size: 0.875rem;">
          <strong>💡 ¿Dudas o consultas?</strong><br>
          Siempre puedes escribirnos por WhatsApp o email.<br>
          ¡Gracias por tu interés en QR Express!
        </p>
      </div>
      <!-- Botón de cierre -->
      <button id="closeModalBtnContacto" style="
        background: linear-gradient(135deg, #22d3ee, #06b6d4);
        border: none;
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-size: 1.125rem;
        font-weight: 600;
        width: 100%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 25px rgba(34, 211, 238, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ¡Perfecto!
      </button>
      <!-- Texto adicional -->
      <p style="color: #9ca3af; font-size: 0.75rem; margin-top: 1rem;">
        Gracias por confiar en QR Express
      </p>
    </div>
  `;
  document.body.appendChild(modal);
  function closeModal() {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
  const closeBtn = modal.querySelector('#closeModalBtnContacto');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  const handleEsc = function(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
  setTimeout(closeModal, 10000);
} 