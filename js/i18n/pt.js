export default {
  label:             'PT',
  flag:              '🇧🇷',
  name:              'Português (BR)',

  chip:              'Sincronização de Biblioteca',
  h1:                'Sua leitura no<br><span>Mihon → AniList</span>',
  hero_p:            'Importe seu backup ou lista exportada do Mihon e sincronize automaticamente todas as suas obras com o AniList.',

  card1_title:       'Como obter o Token do AniList',
  card1_p:           'Acesse <a href="https://anilist.co/settings/developer" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/settings/developer</a>, crie um novo cliente com qualquer nome e use a URL de redirect <a href="https://anilist.co/api/v2/oauth/pin" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/pin</a>. Depois acesse esse link alterando o client_id para o seu: <a href="https://anilist.co/api/v2/oauth/authorize?client_id=SEU_CLIENT_ID&amp;response_type=token" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/authorize?client_id=CLIENT_ID&amp;response_type=token</a>, autorize o app e copie o token exibido.',

  card2_title:       'De onde exportar os arquivos?',
  card2_p:           'No Mihon, vá em <strong>Mais → Configurações → Dados e armazenamento</strong>. Lá você encontra as opções <strong>Criar backup</strong> (.tachibk) e <strong>Exportar biblioteca</strong> (.csv).',

  card3_title:       'Atenção: nomes das obras',
  card3_p:           'O AniList usa nomes oficiais (japonês/inglês). Títulos em português, traduções de fãs ou nomes alternativos podem não ser encontrados. Nesse caso, tente editar o nome da obra no Mihon para o título original antes de exportar.',

  card4_title:       'Como acompanhar o progresso?',
  card4_p:           'Você pode acompanhar o progresso da sincronização em tempo real no console. Clique em <strong>Console</strong> e veja! Ele exibe quais obras estão sendo processadas, quantas foram encontradas ou não, e possíveis erros. Use o botão "Limpar" para resetar o console antes de uma nova sincronização.',

  form_title:        'Iniciar Sincronização',
  form_sub:          'Preencha os campos abaixo e clique em sincronizar',

  label_token:       'Token de Acesso AniList',
  placeholder_token: 'Cole seu token aqui',

  label_file:        'Arquivo de Biblioteca',
  ftc_backup:        'Backup',
  ftc_b1:            'Inclui último capítulo lido',
  ftc_b2:            'Bug de obras lidas no histórico incluídas',
  ftc_b3:            'Status Lendo/Planejado automático',
  ftc_export:        'Exportação',
  ftc_e1:            'Mais precisão com a biblioteca',
  ftc_e2:            'Maior taxa de encontradas',
  ftc_e3:            'Sem progresso de capítulo',
  ftc_note:          'Recomendamos o <strong>.tachibk</strong> para ter o progresso dos capítulos. Use o <strong>.csv</strong> se muitas obras não forem encontradas.',

  drop_text:         'Arraste o arquivo ou clique para selecionar',
  drop_sub:          'Suporta .tachibk e .csv',

  btn_sync:          'Sincronizar com AniList',
  console_title:     'Log de progresso',
  btn_clear:         'Limpar',
  console_waiting:   'Aguardando início...',

  footer:            'Feito com ❤️ para leitores de mangá &nbsp;·&nbsp; ⚠ Respeite os limites da API. Não utilize tokens de terceiros.',
};
