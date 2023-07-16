import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
// import { gqlE } from '@nestjs/graphql'

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
    return new User(user);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
