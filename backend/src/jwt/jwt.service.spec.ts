import { Test, TestingModule } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { TEST_KEY } from 'src/common/test.constants';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        { provide: CONFIG_OPTIONS, useValue: { privateKey: TEST_KEY } },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
