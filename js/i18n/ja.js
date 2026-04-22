export default {
  label:             'JP',
  flag:              '🇯🇵',
  name:              '日本語',

  chip:              'ライブラリ同期',
  h1:                'あなたの読書を<br><span>Mihon → AniList</span>',
  hero_p:            'Mihonのバックアップまたはエクスポートリストをインポートして、すべての作品をAniListと自動同期します。',

  card1_title:       'AniListトークンの取得方法',
  card1_p:           '<a href="https://anilist.co/settings/developer" target="_blank" style="color: rgb(255, 255, 255)">anilist.co/settings/developer</a>にアクセスし、任意の名前で新しいクライアントを作成して、リダイレクトURL <a href="https://anilist.co/api/v2/oauth/pin" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/pin</a>を使用してください。次に、client_idをあなたのIDに変更してこのリンクにアクセスします: <a href="https://anilist.co/api/v2/oauth/authorize?client_id=YOUR_CLIENT_ID&amp;response_type=token" target="_blank" style="color: rgb(255, 255, 255)">https://anilist.co/api/v2/oauth/authorize?client_id=YOUR_CLIENT_ID&amp;response_type=token</a>、アプリを認証してトークンをコピーしてください。',

  card2_title:       'ファイルのエクスポート方法',
  card2_p:           'Mihonで<strong>詳細 → 設定 → データとストレージ</strong>に移動します。そこで<strong>バックアップを作成</strong>(.tachibk)と<strong>ライブラリをエクスポート</strong>(.csv)のオプションが見つかります。',

  card3_title:       '注意：作品名について',
  card3_p:           'AniListは公式名（日本語/英語）を使用します。他の言語のタイトル、ファン翻訳、または代替名は見つからない場合があります。その場合は、エクスポート前にMihonで作品名を元のタイトルに編集してみてください。',

  card4_title:       '進捗を確認する方法',
  card4_p:           'コンソールでリアルタイムに同期の進捗を確認できます。<strong>Console</strong>をクリックして確かめてください！処理中の作品、見つかった・見つからなかった作品数、エラーが表示されます。新しい同期の前に「クリア」ボタンでコンソールをリセットしてください。',

  form_title:        '同期を開始',
  form_sub:          '以下のフィールドを入力して同期をクリックしてください',

  label_token:       'AniListアクセストークン',
  placeholder_token: 'トークンをここに貼り付け',

  label_file:        'ライブラリファイル',
  ftc_backup:        'バックアップ',
  ftc_b1:            '最後に読んだ章を含む',
  ftc_b2:            '履歴の既読作品が含まれるバグあり',
  ftc_b3:            '読書中/予定ステータス自動設定',
  ftc_export:        'エクスポート',
  ftc_e1:            'ライブラリとの精度が高い',
  ftc_e2:            '検出率が高い',
  ftc_e3:            '章の進捗なし',
  ftc_note:          '章の進捗のために<strong>.tachibk</strong>を推奨します。多くの作品が見つからない場合は<strong>.csv</strong>を使用してください。',

  drop_text:         'ファイルをドラッグするかクリックして選択',
  drop_sub:          '.tachibkと.csvに対応',

  btn_sync:          'AniListと同期',
  console_title:     '進捗ログ',
  btn_clear:         'クリア',
  console_waiting:   '開始を待っています...',

  footer:            'マンガ読者のために ❤️ で作成 &nbsp;·&nbsp; ⚠ APIの制限を守ってください。第三者のトークンを使用しないでください。',
};
