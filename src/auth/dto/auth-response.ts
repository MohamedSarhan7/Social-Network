export class AuthResponse {
  id: number;

  username: string;

  picture?: string;

  atToken: string;

  rtToken: string;

  constructor(partial: Partial<AuthResponse>) {
    Object.assign(this, partial);
  }
}
