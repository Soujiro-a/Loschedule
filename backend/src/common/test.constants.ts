import { Model } from 'mongoose';

export const TEST_KEY = 'testKey';
export const jwtSignedToken = 'signed-token';

export const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  aggregate: jest.fn(),
});

export type mockRepository<T = any> = Partial<
  Record<keyof Model<T>, jest.Mock>
>;

export const mockJwtService = () => ({
  sign: jest.fn(() => jwtSignedToken),
  verify: jest.fn(),
});
