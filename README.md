# Perfil profesional de EPDODEV

Sitio estático de una sola página creado con HTML5, CSS3 y JavaScript vanilla. No requiere dependencias ni paso de compilación.

## Ejecutar localmente

Puedes abrir `index.html` directamente en un navegador. Para servirlo localmente, desde esta carpeta ejecuta:

```sh
python -m http.server 8000
```

Luego visita <http://localhost:8000>.

## Publicar en Netlify

1. Sube esta carpeta a un repositorio Git o arrástrala a Netlify Drop.
2. En Netlify, crea un sitio nuevo e indica el repositorio.
3. Deja vacío el comando de build y configura la carpeta de publicación como `.` (raíz del proyecto).
4. Publica el sitio. Netlify servirá `index.html` y sus archivos CSS y JavaScript directamente.

## Personalizar

Las secciones de perfil, estudios, experiencia, herramientas y contactos se completaron con la información de tu CV y los datos adicionales. Revisa los textos `[Completar: ...]` para añadir el cargo y las fechas que faltan de Tiendas Industriales TIA S.A., detallar las capacitaciones si tienes sus nombres oficiales, y completar niveles de habilidades cuando quieras especificarlos.

La fotografía se carga desde `assets/fotocv.png` y el botón de descarga usa `assets/cv-victor-moran.pdf`. Para reemplazarlos, conserva esos nombres de archivo o actualiza sus rutas en `index.html`.
