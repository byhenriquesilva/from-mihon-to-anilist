export default {
  label:             'ES',
  flag:              '🇪🇸',
  name:              'Español',

  chip:              'Sincronización de Biblioteca',
  h1:                'Tu lectura en<br><span>Mihon → AniList</span>',
  hero_p:            'Importa tu copia de seguridad o lista exportada de Mihon y sincroniza automáticamente todas tus obras con AniList.',

  card1_title:       'Cómo obtener el Token de AniList',
  card1_p:           'Ve a <a href="https://anilist.co/settings/developer" target="_blank" style="color: rgb(255, 255, 255)">anilist.co/settings/developer</a>, crea un nuevo cliente con cualquier nombre y usa la URL de redirección <a href="https://anilist.co/api/v2/oauth/pin" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/pin</a>. Luego abre este enlace con tu client_id: <a href="https://anilist.co/api/v2/oauth/authorize?client_id=TU_CLIENT_ID&amp;response_type=token" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/authorize?client_id=TU_CLIENT_ID&amp;response_type=token</a>, autoriza la app y copia el token.',

  card2_title:       '¿Desde dónde exportar los archivos?',
  card2_p:           'En Mihon, ve a <strong>Más → Configuración → Datos y almacenamiento</strong>. Allí encontrarás las opciones <strong>Crear copia de seguridad</strong> (.tachibk) y <strong>Exportar biblioteca</strong> (.csv).',

  card3_title:       'Atención: nombres de las obras',
  card3_p:           'AniList usa nombres oficiales (japonés/inglés). Títulos en español, traducciones de fans o nombres alternativos pueden no encontrarse. En ese caso, intenta editar el nombre en Mihon al título original antes de exportar.',

  card4_title:       '¿Cómo seguir el progreso?',
  card4_p:           'Puedes seguir el progreso de la sincronización en tiempo real en la consola. ¡Haz clic en <strong>Console</strong> y compruébalo! Muestra qué obras se están procesando, cuántas se encontraron o no, y posibles errores. Usa el botón "Limpiar" para reiniciar la consola antes de una nueva sincronización.',

  form_title:        'Iniciar Sincronización',
  form_sub:          'Completa los campos a continuación y haz clic en sincronizar',

  label_token:       'Token de Acceso AniList',
  placeholder_token: 'Pega tu token aquí',

  label_file:        'Archivo de Biblioteca',
  ftc_backup:        'Copia de seguridad',
  ftc_b1:            'Incluye último capítulo leído',
  ftc_b2:            'Bug: obras leídas del historial incluidas',
  ftc_b3:            'Estado Leyendo/Planeado automático',
  ftc_export:        'Exportación',
  ftc_e1:            'Más precisión con la biblioteca',
  ftc_e2:            'Mayor tasa de encontradas',
  ftc_e3:            'Sin progreso de capítulo',
  ftc_note:          'Recomendamos <strong>.tachibk</strong> para el progreso de capítulos. Usa <strong>.csv</strong> si muchas obras no se encuentran.',

  drop_text:         'Arrastra el archivo o haz clic para seleccionar',
  drop_sub:          'Soporta .tachibk y .csv',

  btn_sync:          'Sincronizar con AniList',
  console_title:     'Registro de progreso',
  btn_clear:         'Limpiar',
  console_waiting:   'Esperando inicio...',

  footer:            'Hecho con ❤️ para lectores de manga &nbsp;·&nbsp; ⚠ Respeta los límites de la API. No uses tokens de terceros.',
};
