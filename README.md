# 🍕 Aplicación de Menú de Restaurante & Carrito de Compras

🚀 **Live Demo:** [https://tu-despliegue.vercel.app](https://tu-despliegue.vercel.app) *(Reemplazar con la URL real de despliegue)*

Aplicación web moderna y ligera desarrollada para la gestión de menús de restaurante y recepción de pedidos en tiempo real. Construida con **Astro**, **Tailwind CSS** y un backend serverless sin costo utilizando **Google Sheets & Google Apps Script**.

---

## 🛠️ Stack Tecnológico

- **Frontend Framework:** [Astro](https://astro.build/) (Static Site Generation / Islands Architecture)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Gestión de Estado Client-Side:** [NanoStores](https://github.com/nanostores/nanostores) (1KB, cero dependencias)
- **Backend & Base de Datos:** Google Sheets API vía Google Apps Script (Web App)

---

## 📋 Supuestos y Decisiones Técnicas

### 1. Decisiones de Arquitectura
- **Astro + NanoStores:** Se seleccionó Astro por su rendimiento superior y tiempo de carga mínimo. Para la interactividad del carrito se utilizó **NanoStores** en lugar de incluir frameworks más pesados (como React o Vue completo), manteniendo un *bundle size* prácticamente nulo y permitiendo reactividad pura con Web Components/Vanilla JS.
- **Evitar CORS Preflight en Apps Script:** Al realizar peticiones `POST` a Google Apps Script, las solicitudes con cabecera `application/json` disparan un *preflight* `OPTIONS` que Apps Script no resuelve nativamente. Se decidió enviar el payload con cabecera `text/plain;charset=utf-8`, permitiendo que Apps Script procese el JSON desde `e.postData.contents` sin bloqueos de seguridad.

### 2. Recortes de Alcance (Trade-offs por Simplicidad)
- **Persistencia en LocalStorage:** El estado del carrito vive únicamente en memoria durante la sesión del usuario. No se implementó sincronización con `localStorage` para priorizar la simplicidad del flujo.
- **Validaciones Complejas de Entrada:** Las validaciones del formulario de checkout están delegadas a las capacidades nativas del navegador (`HTML5 validation`), evitando librerías pesadas como Zod o Yup.
- **Galería de Imágenes Dinámica:** Las tarjetas utilizan *placeholders* ilustrativos en CSS/Emoji en lugar de cargar imágenes remotas desde Google Drive para asegurar tiempos de respuesta inmediatos.

### 3. Limitaciones de Google Sheets como Base de Datos
- **Concurrencia Reducida:** Google Sheets no admite escrituras concurrentes de alta frecuencia y puede sufrir bloqueos o inconsistencias si se procesan múltiples transacciones simultáneas.
- **Latencia de Redirección (302 Redirects):** Google Apps Script responde a peticiones Web App redirigiendo a `script.googleusercontent.com`, lo que agrega entre 500ms y 2s de latencia por cada petición HTTP `GET`/`POST`.
- **Ausencia de Relaciones y Transacciones:** No existe soporte para claves foráneas, restricciones de unicidad o rollback en caso de fallos parciales.

---

## ⏱️ Con una hora extra...

Si dispusiera de una hora adicional de desarrollo, agregaría las siguientes mejoras:
1. **Sincronización en Tiempo Real del Menú (Client-Side SWR):** Convertir la carga del menú a client-side fetching o revalidación en segundo plano para reflejar cambios en la hoja de cálculo sin necesidad de reconstruir la aplicación estática.
2. **Persistencia del Carrito & Notificaciones Toast:** Guardar el estado del carrito en `localStorage` para sobrevivir a recargas de página y agregar un sistema de notificaciones *Toast* flotantes para retroalimentación visual al agregar productos.
3. **Integración con Pasarela de Pagos / WhatsApp:** Añadir la opción de redirigir el resumen del pedido a la API de WhatsApp Business del restaurante o integrar un botón de checkout directo con MercadoPago/Stripe.
4. **Pruebas Automatizadas:** Implementar tests de integración E2E con Playwright para verificar la adición de ítems al carrito y el envío exitoso de la orden.

---

