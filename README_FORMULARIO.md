# Formulario de Prueba Gratuita - QR Express

## Descripción
Este formulario permite a los usuarios solicitar una prueba gratuita de 14 días del servicio QR Express. El formulario recopila toda la información necesaria para crear un QR personalizado y contactar al cliente.

## Archivos del Formulario

### 1. `formulario-prueba.html`
- Página principal del formulario
- Diseño responsivo con glassmorphism
- Incluye todos los campos requeridos y opcionales
- Integración con animaciones AOS y partículas

### 2. `formulario.js`
- Funcionalidad JavaScript del formulario
- Validaciones en tiempo real
- Manejo de subida de archivos
- Simulación de envío con modal de confirmación

### 3. `styles.css` (actualizado)
- Estilos específicos para el formulario
- Efectos de hover y focus
- Validación visual
- Responsive design

## Campos del Formulario

### Información Personal
1. **Nombre completo** (requerido)
   - Campo de texto
   - Validación de formato

2. **Nombre del negocio o marca** (requerido)
   - Campo de texto
   - Ejemplo: "Restaurante El Buen Sabor"

3. **Rubro del negocio** (requerido)
   - Select con opciones predefinidas
   - Opción "Otro" con campo de texto adicional
   - Opciones incluyen: Restaurante, Peluquería, Gimnasio, etc.

### Información del Negocio
4. **Dirección del negocio en Google Maps** (requerido)
   - Textarea para link o dirección completa
   - Necesario para vincular el QR a las reseñas

5. **Logo del negocio** (opcional)
   - Subida de archivo con preview
   - Validación de tipo y tamaño (máx. 5MB)
   - Formatos aceptados: PNG, JPG, SVG

### Información de Contacto
6. **Email** (requerido)
   - Validación de formato de email
   - Feedback visual de validación

7. **WhatsApp** (requerido)
   - Formateo automático con código de país (+54)
   - Validación de formato

### Preferencias de Diseño
8. **Preferencias de diseño o colores** (opcional)
   - Textarea para comentarios
   - Ejemplos de uso

## Funcionalidades

### Validaciones
- **Email**: Formato válido con regex
- **WhatsApp**: Formateo automático y validación
- **Archivos**: Tipo y tamaño máximo
- **Campos requeridos**: Validación HTML5

### Interactividad
- **Rubro "Otro"**: Muestra/oculta campo adicional
- **Subida de logo**: Preview con opción de eliminar
- **Efectos visuales**: Hover, focus, loading states
- **Modal de éxito**: Confirmación de envío

### Responsive Design
- Adaptable a móviles y tablets
- Campos optimizados para touch
- Tamaño de fuente que evita zoom en iOS

## Integración con Backend

### Datos Recopilados
```javascript
{
  nombre: "Juan Pérez",
  negocio: "Restaurante El Buen Sabor",
  rubro: "Restaurante",
  direccion: "https://maps.google.com/...",
  email: "juan@email.com",
  whatsapp: "+54 9 11 1234-5678",
  preferencias: "Me gustaría colores rojo y blanco",
  logo: File // objeto File si se subió
}
```

### Endpoint Sugerido
```javascript
// POST /api/solicitar-prueba
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
}
```

## Personalización

### Colores y Estilos
- Los colores principales están en variables CSS
- Fácil personalización del tema
- Efectos de glassmorphism configurables

### Validaciones
- Las validaciones se pueden modificar en `formulario.js`
- Regex patterns configurables
- Mensajes de error personalizables

### Campos Adicionales
- Fácil agregar nuevos campos
- Mantiene la consistencia visual
- Validaciones automáticas

## Uso

1. **Navegación**: Los botones "Solicitar prueba gratuita" redirigen al formulario
2. **Completado**: El usuario llena todos los campos requeridos
3. **Envío**: Se valida y envía la información
4. **Confirmación**: Modal de éxito con próximos pasos
5. **Seguimiento**: Contacto por email y WhatsApp en 24 horas

## Notas Técnicas

- **Compatibilidad**: Funciona en todos los navegadores modernos
- **Performance**: Carga optimizada con CDNs
- **Accesibilidad**: Labels y ARIA attributes incluidos
- **SEO**: Meta tags y estructura semántica
- **Seguridad**: Validación tanto cliente como servidor necesaria

## Próximos Pasos

1. Integrar con backend real
2. Agregar captcha para spam
3. Implementar analytics
4. A/B testing de formularios
5. Integración con CRM 