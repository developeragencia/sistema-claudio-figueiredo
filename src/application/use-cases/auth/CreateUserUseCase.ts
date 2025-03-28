import { User } from '@/domain/entities/User';
import { Role } from '@/domain/entities/Role';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { RoleRepository } from '@/domain/repositories/RoleRepository';
import { HashService } from '@/domain/services/HashService';

interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  roleIds: string[];
}

interface CreateUserOutput {
  id: string;
  email: string;
  name: string;
  roles: {
    id: string;
    name: string;
  }[];
}

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private hashService: HashService
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const roles: Role[] = [];
    for (const roleId of input.roleIds) {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new Error(`Role com ID ${roleId} não encontrada`);
      }
      roles.push(role);
    }

    const hashedPassword = await this.hashService.hash(input.password);

    const user = new User(
      crypto.randomUUID(),
      input.email,
      hashedPassword,
      input.name,
      roles
    );

    await this.userRepository.create(user);

    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      roles: user.getRoles().map(role => ({
        id: role.getId(),
        name: role.getName()
      }))
    };
  }
} 