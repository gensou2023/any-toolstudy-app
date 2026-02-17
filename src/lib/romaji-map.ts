/**
 * Hiragana to romaji mapping with multiple input patterns.
 * Each hiragana character maps to an array of valid romaji inputs.
 */
const ROMAJI_MAP: Record<string, string[]> = {
  'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
  'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
  'さ': ['sa'], 'し': ['si', 'shi'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['ti', 'chi'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['hu', 'fu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'を': ['wo'], 'ん': ['n', 'nn'],
  // Dakuten
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['zi', 'ji'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du', 'zu'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  // Combo (yōon)
  'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
  'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'],
  'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'],
  'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
  'じゃ': ['ja', 'zya'], 'じゅ': ['ju', 'zyu'], 'じょ': ['jo', 'zyo'],
  'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],
  // Small kana
  'ぁ': ['xa', 'la'], 'ぃ': ['xi', 'li'], 'ぅ': ['xu', 'lu'], 'ぇ': ['xe', 'le'], 'ぉ': ['xo', 'lo'],
  'っ': ['xtu', 'ltu'], // standalone small tsu
  // Katakana long vowel mark
  'ー': ['-'],
};

// Small tsu (っ) doubles the next consonant
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';

export interface RomajiSegment {
  kana: string;
  romajiOptions: string[];
}

/**
 * Convert a hiragana reading to an array of segments,
 * each with their valid romaji options.
 */
export function kanaToRomajiSegments(reading: string): RomajiSegment[] {
  const segments: RomajiSegment[] = [];
  let i = 0;

  while (i < reading.length) {
    // Check for small tsu (っ) followed by another character
    if (reading[i] === 'っ' && i + 1 < reading.length) {
      // Look ahead for the next segment
      let nextKana = '';
      let nextOptions: string[] = [];

      // Try 2-char combo first
      if (i + 2 < reading.length) {
        const twoChar = reading.substring(i + 1, i + 3);
        if (ROMAJI_MAP[twoChar]) {
          nextKana = twoChar;
          nextOptions = ROMAJI_MAP[twoChar];
        }
      }

      // Try single char
      if (!nextKana && ROMAJI_MAP[reading[i + 1]]) {
        nextKana = reading[i + 1];
        nextOptions = ROMAJI_MAP[nextKana];
      }

      if (nextKana && nextOptions.length > 0) {
        // Double the first consonant of the next segment
        const doubledOptions = nextOptions.map(opt => {
          const firstChar = opt[0];
          if (CONSONANTS.includes(firstChar)) {
            return firstChar + opt;
          }
          return opt;
        });
        segments.push({ kana: 'っ' + nextKana, romajiOptions: doubledOptions });
        i += 1 + nextKana.length;
        continue;
      }
    }

    // Try 2-char combo (yōon, etc.)
    if (i + 1 < reading.length) {
      const twoChar = reading.substring(i, i + 2);
      if (ROMAJI_MAP[twoChar]) {
        segments.push({ kana: twoChar, romajiOptions: ROMAJI_MAP[twoChar] });
        i += 2;
        continue;
      }
    }

    // Single char
    if (ROMAJI_MAP[reading[i]]) {
      segments.push({ kana: reading[i], romajiOptions: ROMAJI_MAP[reading[i]] });
    } else {
      // Unknown character, treat as literal
      segments.push({ kana: reading[i], romajiOptions: [reading[i]] });
    }
    i++;
  }

  return segments;
}

/**
 * Get the default (first) romaji representation for display.
 */
export function getDefaultRomaji(reading: string): string {
  const segments = kanaToRomajiSegments(reading);
  return segments.map(s => s.romajiOptions[0]).join('');
}
