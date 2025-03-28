import { UserRepository } from '@/domain/repositories/UserRepository';
import { HashService } from '@/domain/services/HashService';
import { TokenService } from '@/domain/services/TokenService';

interface SignInInput {
  email: string;
  password: string;
}

interface SignInOutput {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: {
      id: string;
      name: string;
      permissions: string[];
    }[];
  };
}

export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private tokenService: TokenService
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    if (!user.getIsActive()) {
      throw new Error('Usuário inativo');
    }

    const isValidPassword = await this.hashService.compare(
      input.password,
      user.getPassword()
    );

    if (!isValidPassword) {
      throw new Error('Email ou senha inválidos');
    }

    const token = await this.tokenService.generate({
      userId: user.getId(),
      roles: user.getRoles().map(role => ({
        id: role.getId(),
        name: role.getName(),
        permissions: role.getPermissions()
      }))
    });

    return {
      token,
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        roles: user.getRoles().map(role => ({
          id: role.getId(),
          name: role.getName(),
          permissions: role.getPermissions()
        }))
      }
    };
  }
} 