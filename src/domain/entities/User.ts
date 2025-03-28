/// <reference lib="es2015" />
/// <reference lib="dom" />

import { Role } from './Role';

export class User {
  constructor(
    private readonly id: string,
    private email: string,
    private password: string,
    private name: string,
    private roles: Role[],
    private isActive: boolean = true,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.email) {
      throw new Error('Email é obrigatório');
    }
    if (!this.isValidEmail(this.email)) {
      throw new Error('Email inválido');
    }
    if (!this.password) {
      throw new Error('Senha é obrigatória');
    }
    if (!this.name) {
      throw new Error('Nome é obrigatório');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  getRoles(): Role[] {
    return [...this.roles];
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters
  updateEmail(email: string): void {
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    this.email = email;
    this.updatedAt = new Date();
  }

  updateName(name: string): void {
    if (!name) {
      throw new Error('Nome é obrigatório');
    }
    this.name = name;
    this.updatedAt = new Date();
  }

  updatePassword(password: string): void {
    if (!password) {
      throw new Error('Senha é obrigatória');
    }
    this.password = password;
    this.updatedAt = new Date();
  }

  addRole(role: Role): void {
    const existingRole = this.roles.find((r: Role): boolean => r.getId() === role.getId());
    if (!existingRole) {
      this.roles.push(role);
      this.updatedAt = new Date();
    }
  }

  removeRole(roleId: string): void {
    this.roles = this.roles.filter((r: Role): boolean => r.getId() !== roleId);
    this.updatedAt = new Date();
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  hasRole(roleId: string): boolean {
    return this.roles.some((r: Role): boolean => r.getId() === roleId);
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      roles: this.roles.map((r: Role) => r.toJSON()),
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 