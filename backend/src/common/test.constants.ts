import { Model } from 'mongoose';

export const TEST_KEY = 'testKey';

export const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

export type mockRepository<T = any> = Partial<
  Record<keyof Model<T>, jest.Mock>
>;
