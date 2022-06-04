import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/schemas/user.schema';

export type AllowedRoles = typeof UserRole[number] | 'any';
export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
