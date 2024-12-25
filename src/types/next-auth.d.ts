import { LoginResponse } from '@/types';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
declare module 'next-auth' {
  interface User extends DefaultUser {
    status?: boolean;
    data: LoginResponse;
  }

  // type used after received token from login decoded
  interface Session extends DefaultSession {
    id: string;
    name: string;
    email: string;
    company_name: string;
    type: 'Vendor' | 'Division' | 'Internal';
    company_date: string;
    role: string;
    role_name: string;
    accessToken: string;
    vendor_id: string;
    division_permission: 1 | 2;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
    company_name: string;
    company_date: string;
    role: string;
    type: 'Vendor' | 'Division' | 'Internal';
    role_name: string;
    exp: number;
    vendor_id: string;
    division_permission: 1 | 2;
  }
}
