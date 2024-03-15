import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
