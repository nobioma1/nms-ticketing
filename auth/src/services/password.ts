import bcrypt from 'bcryptjs';

export class Password {
  static toHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static compare(storedPassword: string, suppliedPassword: string): boolean {
    return bcrypt.compareSync(suppliedPassword, storedPassword);
  }
}
