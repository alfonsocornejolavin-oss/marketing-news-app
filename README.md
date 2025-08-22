# Marketing & Advertising News Aggregator

Este proyecto es una aplicación web dinámica construida con **Next.js**, **React** y **Tailwind CSS** que recopila en tiempo real las principales noticias sobre marketing, publicidad y creatividad de todo el mundo. La aplicación consulta varios **feeds RSS** de portales especializados, organiza automáticamente las noticias por país y ofrece una interfaz moderna y minimalista inspirada en sitios como Spark & Riot y los ganadores de Awwwards.

## Funcionalidades principales

- **Agregación de noticias por país**: los feeds configurados en `config/feeds.js` se agrupan por país y se muestran en pestañas o botones para facilitar la navegación. Se pueden añadir tantas fuentes como se desee.
- **Actualización automática**: el servidor obtiene los datos en cada solicitud mediante `getServerSideProps` y la capa cliente utiliza SWR para refrescar la información cada hora de forma transparente. Esto asegura que las noticias estén siempre al día.
- **Búsqueda interna**: un sencillo buscador filtra las noticias por palabra clave dentro del país seleccionado.
- **Diseño responsive**: utiliza Tailwind CSS para garantizar que el sitio sea atractivo y funcional tanto en escritorio como en dispositivos móviles.

## Estructura del proyecto

- `pages/index.js`: página principal que renderiza la UI y maneja la lógica de búsqueda y filtrado. Utiliza `getServerSideProps` para obtener la data inicial y SWR para actualizaciones en cliente.
- `pages/api/news.js`: API interna que agrupa todas las fuentes y devuelve un objeto JSON organizado por país. Incluye cabeceras de cacheado para optimizar el rendimiento en plataformas como Vercel y Netlify.
- `config/feeds.js`: lista de feeds RSS con sus nombres y países asociados. Aquí puedes añadir, modificar o eliminar fuentes.
- `utils/fetchFeeds.js`: lógica para descargar y normalizar los feeds usando la librería `rss-parser`. Extrae imágenes, snippets y ordena los artículos por fecha.
- `components/`: contiene los componentes de presentación (`NewsCard`, `CountryTabs`) que ayudan a mantener la UI desacoplada de la lógica.
- `styles/`: incluye el fichero global de estilos con Tailwind.
- `tailwind.config.js` y `postcss.config.js`: configuración necesaria para Tailwind CSS.

## Cómo conectar nuevos feeds

1. Abre `config/feeds.js` y añade un nuevo objeto con las siguientes propiedades:

```js
{
  name: 'Nombre del portal',
  country: 'País al que pertenece',
  url: 'URL del feed RSS o Atom',
}
```

2. Guarda el archivo. No es necesario reiniciar el servidor en desarrollo; Next.js recargará automáticamente los cambios.

3. Si el feed no incluye imágenes en el campo `enclosure`, el parser intentará extraer la primera etiqueta `<img>` del contenido HTML. De lo contrario, el artículo se mostrará sin imagen.

## Despliegue en Vercel o Netlify

1. Clona este repositorio y ejecuta `npm install` para instalar las dependencias.
2. Ejecuta `npm run dev` para levantar el servidor en modo de desarrollo.
3. Para desplegar, crea un repositorio en GitHub y sube el código. A continuación:
   - **Vercel**: importa el repositorio en [Vercel](https://vercel.com/new) y acepta la configuración predeterminada. Vercel detectará automáticamente que es un proyecto de Next.js.
   - **Netlify**: importa el repositorio en [Netlify](https://app.netlify.com/start) y establece los comandos de build (`npm run build`) y directorio de publicación (`.next`). Netlify también soporta Next.js con Serverless Functions.
4. Una vez desplegado, la aplicación se actualizará sola según el intervalo definido en SWR. Puedes ajustar el refresco modificando el valor de `refreshInterval` en `pages/index.js`.

## Comentarios finales

Este proyecto es una base sólida para un agregador de noticias sectoriales. Está pensado para ser extendido fácilmente: añade más feeds, ajusta estilos en `globals.css` o `tailwind.config.js`, incorpora secciones como “Top Ads del día” o botones para compartir en redes sociales. Todo el código incluye comentarios que explican cómo y por qué se implementan determinadas decisiones, facilitando su mantenimiento.
