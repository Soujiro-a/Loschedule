import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import cheerioModule from 'cheerio';
import { take } from 'rxjs';

export interface CharacterInfo {
  name: string;
  level: number;
  job: string;
  server: string;
}

@Injectable()
export class CrawlerService {
  constructor(private readonly httpService: HttpService) {}

  async scrape(charName: string): Promise<CharacterInfo> {
    try {
      const html = await this.getHtmlFromWebsite(charName);
      const $ = cheerioModule.load(html.data);
      const name = $('.profile-character-info__name').text();
      const level = parseInt(
        $('.level-info2__item span:nth-of-type(2)')
          .text()
          .match(/[^Lv.]\d?(?:[,0-9]*)/g)[0]
          .replace(/,/g, ''),
      );
      const job = $('.profile-character-info__img').attr('alt');
      const server = $('.profile-character-info__server')
        .text()
        .replace('@', '');

      return {
        name,
        level: +level,
        job,
        server,
      };
    } catch {
      throw new Error();
    }
  }

  getHtmlFromWebsite(name: string): any {
    const encoded = encodeURI(name);
    const targetUrl = `https://lostark.game.onstove.com/Profile/Character/${encoded}`;
    return new Promise((resolve) => {
      this.httpService
        .get(targetUrl)
        .pipe(take(1))
        .subscribe((data) => resolve(data));
    });
  }
}
