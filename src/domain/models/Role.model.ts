import { IRoleModelInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

export class RoleModel implements IRoleModelInterface {
  role: string;
  isActive: boolean;

  constructor(role?: string) {
    this.role = role;
    this.isActive = true;
  }
}
