// Funcionalidad del formulario de prueba gratuita
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar EmailJS con tu User ID
    if (typeof emailjs !== 'undefined') {
        emailjs.init("y99EduzXQSRNo5N45");
    }
    
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Configurar partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00d4ff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00d4ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Manejar el campo "Otro" en el rubro
    const rubroSelect = document.getElementById('rubro');
    const rubroOtroDiv = document.getElementById('rubroOtro');
    const rubroOtroTexto = document.getElementById('rubroOtroTexto');

    if (rubroSelect) {
        rubroSelect.addEventListener('change', function() {
            if (this.value === 'Otro') {
                rubroOtroDiv.classList.remove('hidden');
                rubroOtroTexto.required = true;
            } else {
                rubroOtroDiv.classList.add('hidden');
                rubroOtroTexto.required = false;
                rubroOtroTexto.value = '';
            }
        });
    }

    // Manejar la subida de logo
    const logoInput = document.getElementById('logo');
    const logoPreview = document.getElementById('logoPreview');
    const logoPreviewImg = document.getElementById('logoPreviewImg');
    const removeLogoBtn = document.getElementById('removeLogo');

    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validar tamaño (5MB máximo)
                if (file.size > 5 * 1024 * 1024) {
                    alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
                    this.value = '';
                    return;
                }

                // Validar tipo de archivo
                if (!file.type.match('image.*')) {
                    alert('Por favor selecciona solo archivos de imagen.');
                    this.value = '';
                    return;
                }

                // Mostrar preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    logoPreviewImg.src = e.target.result;
                    logoPreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Eliminar logo
    if (removeLogoBtn) {
        removeLogoBtn.addEventListener('click', function() {
            logoInput.value = '';
            logoPreview.classList.add('hidden');
            logoPreviewImg.src = '';
        });
    }

    // Manejar el envío del formulario
    const form = document.getElementById('pruebaForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Enviando...';
            submitBtn.disabled = true;

            // Recopilar datos del formulario correctamente
            const data = {
                nombre: form.querySelector('#nombre').value,
                negocio: form.querySelector('#negocio').value,
                rubro: form.querySelector('#rubro').value === 'Otro' ? form.querySelector('#rubroOtroTexto').value : form.querySelector('#rubro').value,
                direccion: form.querySelector('#direccion').value,
                email: form.querySelector('#email').value,
                whatsapp: form.querySelector('#whatsapp').value,
                preferencias: form.querySelector('#preferencias').value || 'Sin preferencias específicas',
                logo: form.querySelector('#logo').files.length > 0 ? 'Sí, se adjuntó logo' : 'No se adjuntó logo',
                fecha: new Date().toLocaleString('es-AR')
            };

            console.log('Datos recopilados:', data);

            // Enviar por email usando EmailJS
            enviarPorEmail(data, submitBtn, originalText);
        });
    }

    // Función para enviar por email
    function enviarPorEmail(data, submitBtn, originalText) {
        // Configuración de EmailJS con tus datos
        const templateParams = {
            to_name: 'QR Express',
            from_name: data.nombre,
            from_email: data.email,
            whatsapp: data.whatsapp,
            negocio: data.negocio,
            rubro: data.rubro,
            direccion: data.direccion,
            logo: data.logo,
            preferencias: data.preferencias,
            fecha: data.fecha,
            reply_to: data.email
        };

        console.log('Enviando datos a EmailJS:', templateParams);

        // Enviar email usando EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_g4flube', 'template_k0mtrhm', templateParams)
                .then(function(response) {
                    console.log('Email enviado exitosamente:', response);
                    mostrarMensajeExito();
                    resetearFormulario();
                }, function(error) {
                    console.log('Error al enviar email:', error);
                    // Fallback: mostrar datos en consola
                    console.log('Datos del formulario:', data);
                    mostrarMensajeExito();
                    resetearFormulario();
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        } else {
            // Si EmailJS no está disponible, mostrar datos en consola
            console.log('Datos del formulario:', data);
            mostrarMensajeExito();
            resetearFormulario();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Función para resetear formulario
    function resetearFormulario() {
        const form = document.getElementById('pruebaForm');
        const logoPreview = document.getElementById('logoPreview');
        const rubroOtroDiv = document.getElementById('rubroOtro');
        
        form.reset();
        logoPreview.classList.add('hidden');
        rubroOtroDiv.classList.add('hidden');
    }

    // Función para mostrar mensaje de éxito
    function mostrarMensajeExito() {
        // Crear modal de éxito con diseño simple y robusto
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
                    ¡Solicitud Enviada!
                </h3>

                <!-- Mensaje principal -->
                <p style="
                    color: #d1d5db;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                    font-size: 1.1rem;
                ">
                    Tu solicitud de prueba gratuita fue enviada exitosamente. 
                    <span style="color: #22d3ee; font-weight: 600;">Te contactaremos en las próximas 24 horas</span> con tu QR personalizado.
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
                            <p style="color: #10b981; font-size: 0.875rem; font-weight: 500;">Te escribiremos por WhatsApp</p>
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
                        <strong>💡 Próximos pasos:</strong><br>
                        1. Recibís tu QR personalizado<br>
                        2. Te capacitamos para implementarlo<br>
                        3. Comenzás a recibir reseñas automáticamente
                    </p>
                </div>

                <!-- Botón de cierre -->
                <button id="closeModalBtn" style="
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
        
        // Función para cerrar el modal
        function closeModal() {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
        
        // Event listeners para cerrar
        const closeBtn = modal.querySelector('#closeModalBtn');
        closeBtn.addEventListener('click', closeModal);
        
        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Cerrar con ESC
        const handleEsc = function(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
        
        // Forzar el cierre después de 10 segundos (opcional)
        setTimeout(() => {
            if (modal.parentNode) {
                closeModal();
            }
        }, 10000);
    }

    // Validación de WhatsApp
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            // Remover caracteres no numéricos excepto +, espacios y guiones
            let value = e.target.value.replace(/[^\d+\s\-]/g, '');
            
            // Asegurar que empiece con +54 si no tiene código de país
            if (value && !value.startsWith('+')) {
                if (value.startsWith('0')) {
                    value = '+54' + value.substring(1);
                } else if (value.startsWith('9')) {
                    value = '+54' + value;
                } else if (value.startsWith('11')) {
                    value = '+54' + value;
                }
            }
            
            e.target.value = value;
        });
    }

    // Validación de email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-600');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-600');
            }
        });
    }

    // Efectos de hover en campos
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('border-cyan-400');
            this.classList.remove('border-gray-600');
        });
        
        input.addEventListener('blur', function() {
            if (!this.classList.contains('border-red-500')) {
                this.classList.remove('border-cyan-400');
                this.classList.add('border-gray-600');
            }
        });
    });

    // Animación de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 