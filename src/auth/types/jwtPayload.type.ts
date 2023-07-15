export type JwtPayload = {
  username: string;
  id: string;
  iat?: number;
  exp?: number;
  refreshToken?: string;
};
