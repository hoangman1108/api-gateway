import { Query, Resolver } from '@nestjs/graphql';
import { UserResponses } from './user.type';
import { OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Ctx } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './users-svc.options';
import { UsersQueryResult, IUsersService } from './users.interface';
import { PinoLogger } from 'nestjs-pino';
@Resolver()
export class UsersResolver implements OnModuleInit {


  @Client(UsersServiceClientOptions)
  private readonly usersServiceClient: ClientGrpc;

  private usersService: IUsersService;

  constructor(
    private logger: PinoLogger
  ) {
    this.logger.setContext(UsersResolver.name)
  }

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  @Query(() => UserResponses)
  async listUsers(@Ctx() ctx: any): Promise<UserResponses> {
    console.log(ctx);
    const users: UsersQueryResult = await this.usersService.listUsers({}).toPromise();
    const results: UserResponses = {
      users: users.users,
    }
    return results;
  }
}
