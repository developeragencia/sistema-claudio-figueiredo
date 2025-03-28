interface TokenPayload {
  userId: string;
  roles: {
    id: string;
    name: string;
    permissions: string[];
  }[];
}

export interface TokenService {
  generate(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
} 