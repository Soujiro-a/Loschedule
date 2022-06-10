import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Module({
  imports: [HttpModule],
  providers: [CrawlerService],
  exports: [CrawlerService],
})
@Global()
export class CrawlerModule {}
