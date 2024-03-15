export type JwtPayload = {
  username: string;
  id: number;
  iat?: number;
  exp?: number;
  refreshToken?: string;
};
