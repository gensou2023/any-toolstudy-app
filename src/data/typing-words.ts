export interface TypingWord {
  word: string;
  reading: string;
  description: string;
}

export const fukuokaWords: TypingWord[] = [
  { word: '明太子', reading: 'めんたいこ', description: '博多名物の辛子漬け魚卵' },
  { word: 'もつ鍋', reading: 'もつなべ', description: '福岡の定番鍋料理' },
  { word: '博多ラーメン', reading: 'はかたらーめん', description: '豚骨スープの細麺ラーメン' },
  { word: '太宰府天満宮', reading: 'だざいふてんまんぐう', description: '学問の神様を祀る神社' },
  { word: '中洲', reading: 'なかす', description: '日本有数の歓楽街' },
  { word: '屋台', reading: 'やたい', description: '福岡名物の路上飲食店' },
  { word: '水炊き', reading: 'みずたき', description: '鶏ベースのあっさり鍋' },
  { word: '梅ヶ枝餅', reading: 'うめがえもち', description: '太宰府名物の焼き餅' },
  { word: '福岡タワー', reading: 'ふくおかたわー', description: '海浜タワーとしては日本一' },
  { word: 'キャナルシティ', reading: 'きゃなるしてぃ', description: '博多の大型商業施設' },
  { word: '博多祇園山笠', reading: 'はかたぎおんやまかさ', description: '700年以上の歴史ある祭り' },
  { word: '博多どんたく', reading: 'はかたどんたく', description: '日本最大級の祭り' },
  { word: 'ごぼう天うどん', reading: 'ごぼうてんうどん', description: '福岡のソウルフード' },
  { word: '筑前煮', reading: 'ちくぜんに', description: '福岡発祥の煮物料理' },
  { word: '能古島', reading: 'のこのしま', description: '博多湾に浮かぶ花の島' },
  { word: '大濠公園', reading: 'おおほりこうえん', description: '福岡市民の憩いの場' },
  { word: '博多織', reading: 'はかたおり', description: '伝統的な絹織物' },
  { word: '柳橋連合市場', reading: 'やなぎばしれんごういちば', description: '博多の台所' },
];

export const itWords: TypingWord[] = [
  { word: 'プログラミング', reading: 'ぷろぐらみんぐ', description: 'コンピュータへの指示を書くこと' },
  { word: 'データベース', reading: 'でーたべーす', description: 'データを整理して保存する仕組み' },
  { word: 'アルゴリズム', reading: 'あるごりずむ', description: '問題を解く手順' },
  { word: 'インターフェース', reading: 'いんたーふぇーす', description: 'システム間の接点' },
  { word: 'サーバー', reading: 'さーばー', description: 'サービスを提供するコンピュータ' },
  { word: 'フレームワーク', reading: 'ふれーむわーく', description: '開発の土台となる仕組み' },
  { word: 'コンパイラ', reading: 'こんぱいら', description: 'コードを機械語に変換' },
  { word: 'デバッグ', reading: 'でばっぐ', description: 'プログラムの不具合を直すこと' },
  { word: 'リファクタリング', reading: 'りふぁくたりんぐ', description: 'コードを整理して改善すること' },
  { word: 'デプロイ', reading: 'でぷろい', description: 'アプリを公開すること' },
  { word: 'コンポーネント', reading: 'こんぽーねんと', description: '再利用可能な部品' },
  { word: 'レスポンシブ', reading: 'れすぽんしぶ', description: '画面サイズに対応するデザイン' },
  { word: 'クラウド', reading: 'くらうど', description: 'インターネット上のコンピュータ資源' },
  { word: 'ターミナル', reading: 'たーみなる', description: 'コマンドを入力する画面' },
  { word: 'バージョン', reading: 'ばーじょん', description: 'ソフトウェアの版' },
  { word: 'ライブラリ', reading: 'らいぶらり', description: '再利用可能なコード集' },
  { word: 'エンジニア', reading: 'えんじにあ', description: '技術で問題を解決する人' },
  { word: 'セキュリティ', reading: 'せきゅりてぃ', description: '情報を守る仕組み' },
  { word: 'アーキテクチャ', reading: 'あーきてくちゃ', description: 'システムの全体設計' },
  { word: 'スクリプト', reading: 'すくりぷと', description: '自動化のための小さなプログラム' },
];

export function getRandomWords(count: number): TypingWord[] {
  const allWords = [...fukuokaWords, ...itWords];
  const shuffled = allWords.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
