export class Role {
  constructor(
    private readonly id: string,
    private name: string,
    private description: string,
    private permissions: string[],
    private isActive: boolean = true,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name) {
      throw new Error('Nome é obrigatório');
    }
    if (!this.description) {
      throw new Error('Descrição é obrigatória');
    }
    if (!Array.isArray(this.permissions) || this.permissions.length === 0) {
      throw new Error('Permissões são obrigatórias');
    }
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPermissions(): string[] {
    return [...this.permissions];
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
  updateName(name: string): void {
    if (!name) {
      throw new Error('Nome é obrigatório');
    }
    this.name = name;
    this.updatedAt = new Date();
  }

  updateDescription(description: string): void {
    if (!description) {
      throw new Error('Descrição é obrigatória');
    }
    this.description = description;
    this.updatedAt = new Date();
  }

  addPermission(permission: string): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
      this.updatedAt = new Date();
    }
  }

  removePermission(permission: string): void {
    this.permissions = this.permissions.filter(p => p !== permission);
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

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      permissions: [...this.permissions],
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 