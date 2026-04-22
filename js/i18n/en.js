export default {
  label:             'EN',
  flag:              '🇺🇸',
  name:              'English',

  chip:              'Library Synchronization',
  h1:                'Your reading on<br><span>Mihon → AniList</span>',
  hero_p:            'Import your Mihon backup or exported list and automatically sync all your titles with AniList.',

  card1_title:       'How to get the AniList Token',
  card1_p:           'Go to <a href="https://anilist.co/settings/developer" target="_blank" style="color: rgb(255, 255, 255)">anilist.co/settings/developer</a>, create a new client with any name and use the redirect URL <a href="https://anilist.co/api/v2/oauth/pin" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/pin</a>. Then open this link with your client_id: <a href="https://anilist.co/api/v2/oauth/authorize?client_id=YOUR_CLIENT_ID&amp;response_type=token" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/authorize?client_id=YOUR_CLIENT_ID&amp;response_type=token</a>, authorize the app and copy the displayed token.',

  card2_title:       'Where to export the files from?',
  card2_p:           'In Mihon, go to <strong>More → Settings → Data and storage</strong>. There you will find the options <strong>Create backup</strong> (.tachibk) and <strong>Export library</strong> (.csv).',

  card3_title:       'Attention: title names',
  card3_p:           'AniList uses official names (Japanese/English). Titles in other languages, fan translations or alternative names may not be found. In that case, try editing the title in Mihon to the original name before exporting.',

  card4_title:       'How to track the progress?',
  card4_p:           'You can track the sync progress in real time in the console. Click <strong>Console</strong> and see! It shows which titles are being processed, how many were found or not, and possible errors. Use the "Clear" button to reset the console before a new sync.',

  form_title:        'Start Sync',
  form_sub:          'Fill in the fields below and click sync',

  label_token:       'AniList Access Token',
  placeholder_token: 'Paste your token here',

  label_file:        'Library File',
  ftc_backup:        'Backup',
  ftc_b1:            'Includes last chapter read',
  ftc_b2:            'Bug: read titles from history included',
  ftc_b3:            'Reading/Planned status automatic',
  ftc_export:        'Export',
  ftc_e1:            'More accuracy with the library',
  ftc_e2:            'Higher found rate',
  ftc_e3:            'No chapter progress',
  ftc_note:          'We recommend <strong>.tachibk</strong> for chapter progress. Use <strong>.csv</strong> if many titles are not found.',

  drop_text:         'Drag the file or click to select',
  drop_sub:          'Supports .tachibk and .csv',

  btn_sync:          'Sync with AniList',
  console_title:     'Progress log',
  btn_clear:         'Clear',
  console_waiting:   'Waiting to start...',

  footer:            'Made with ❤️ for manga readers &nbsp;·&nbsp; ⚠ Respect API limits. Do not use third-party tokens.',
};
