import { POA_HISTORICAL_PAPER1_RECENT_TEXT } from './poaHistoricalPaper1RecentText';

const question = (paper, number) => POA_HISTORICAL_PAPER1_RECENT_TEXT[paper].find((entry) => entry.number === number);
const paragraphs = (entry) => entry.blocks.filter((block) => block.type === 'paragraph').map((block) => block.text).join('\n');
const tables = (entry) => entry.blocks.filter((block) => block.type === 'table');

describe('recent Accounts Paper 1 native source transcription', () => {
  test.each(Object.entries(POA_HISTORICAL_PAPER1_RECENT_TEXT))('%s retains every available question and four choices in source order', (id, questions) => {
    const availableCount = id === 'poa-1-2017-jan' ? 57 : 60;
    expect(questions.map((entry) => entry.number)).toEqual(Array.from({ length: availableCount }, (_, index) => index + 1));
    const checkBlocks = (blocks) => {
      for (const block of blocks) {
        expect(['paragraph', 'table']).toContain(block.type);
        if (block.type === 'paragraph') expect(typeof block.text).toBe('string');
        if (block.type === 'table') {
          expect(block.columns.length).toBeGreaterThan(0);
          expect(block.rows.length).toBeGreaterThan(0);
          for (const row of block.rows) {
            expect(row).toHaveLength(block.columns.length);
            expect(row.every((cell) => typeof cell === 'string')).toBe(true);
          }
        }
      }
    };
    for (const entry of questions) {
      expect(entry.options).toHaveLength(4);
      expect(paragraphs(entry).trim().length).toBeGreaterThan(10);
      checkBlocks(entry.blocks);
      for (const option of entry.options) {
        if (typeof option === 'string') expect(option.trim().length).toBeGreaterThan(0);
        else checkBlocks(option.blocks);
      }
      expect(entry).not.toHaveProperty('answer');
      expect(entry).not.toHaveProperty('explanation');
    }
    expect(JSON.stringify(questions)).not.toMatch(/\.png|\.pdf|<iframe|<img/);
  });

  test('keeps changed source dates, wording and option positions distinct across sittings', () => {
    expect(paragraphs(question('poa-1-2021-mj', 46))).toContain('6 March 2020');
    expect(paragraphs(question('poa-1-2020-mj', 7))).toContain('6 March 2015');
    expect(question('poa-1-2021-mj', 30).options).toEqual(['Debit cash, credit bank', 'Debit cash, credit cash', 'Credit cash, credit bank', 'Debit bank, credit bank']);
    expect(question('poa-1-2020-mj', 30).options).toEqual(['Trading', 'Appropriation', 'Manufacturing', 'Profit and loss']);
    expect(question('poa-1-2019-mj', 31).options).toEqual(['$340', '$220', '$120', '$100']);
    expect(paragraphs(question('poa-1-2020-mj', 14))).toContain('The acid test ratio indicates');
    expect(question('poa-1-2020-mj', 14).options[0]).toBe('net current assets less inventory available to pay current liabilities');
    expect(paragraphs(question('poa-1-2019-mj', 32))).toContain('A motor van was credited from AG Motors');
    expect(paragraphs(question('poa-1-2022-jan', 56))).toContain('A. Portap bought inventory');
    expect(paragraphs(question('poa-1-2020-jan', 32))).toContain('at 6 March 2019');
    expect(paragraphs(question('poa-1-2020-jan', 32))).toContain('at 6 March 2018?');
    expect(question('poa-1-2022-jan', 57).options[0]).toBe('Karen $2 400 : Garth $1 200');
    expect(question('poa-1-2017-jan', 40).options[0]).toBe('$200');
  });

  test('carries every shared table into each dependent question and keeps journals structured', () => {
    expect(tables(question('poa-1-2021-mj', 15))).toEqual(tables(question('poa-1-2021-mj', 16)));
    expect(tables(question('poa-1-2021-mj', 52))).toEqual(tables(question('poa-1-2021-mj', 53)));
    expect(tables(question('poa-1-2020-mj', 39))).toEqual(tables(question('poa-1-2020-mj', 40)));
    expect(tables(question('poa-1-2019-mj', 26))).toEqual(tables(question('poa-1-2019-mj', 27)));
    expect(question('poa-1-2021-mj', 12).options[2].blocks[0].rows).toEqual([['Dr bank', '117', ''], ['Dr discount allowed', '3', ''], ['Cr K. Khan', '', '120']]);
    expect(question('poa-1-2020-mj', 36).options[2].blocks[0].rows[1][0]).toBe('Cr Profit & Loss A/c');
    expect(tables(question('poa-1-2019-mj', 53))[0].rows).toContainEqual(['Less closing inventory of raw materials 31 December 2018', '1 200', '', '']);
    expect(tables(question('poa-1-2017-jan', 43))[0].rows).toContainEqual(['Salary: Joan', '$2 500']);
    expect(tables(question('poa-1-2017-jan', 43))).toEqual(tables(question('poa-1-2017-jan', 44)));
    expect(tables(question('poa-1-2017-jan', 23))[0].rows[1]).toEqual(['80', '100', '90']);
    expect(question('poa-1-2020-jan', 21).options[2].blocks[0].rows[0]).toEqual(['Debit old computer', '', '$6 000']);
  });
});
