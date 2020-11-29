import { Query, Resolver } from "@nestjs/graphql";
import { UserResponses } from "./user.type";
import { OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClientOptions } from './users-svc.options';
import { UsersQueryResult, IUsersService } from './users.interface';

@Resolver()
export class UsersResolver implements OnModuleInit {
  constructor() {
    console.log('UsernameService.name', UsersResolver.name)
  }

  @Client(UsersServiceClientOptions)
  private readonly usersServiceClient: ClientGrpc;

  private usersService: IUsersService;

  onModuleInit() {
    this.usersService = this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  @Query(()=>UserResponses)
  async listUsers(): Promise<UserResponses> {
    const users: UsersQueryResult = await this.usersService.listUsers({}).toPromise();
    const results: UserResponses = {
      users: users.users,
    }
    console.log(results);
    return results;
  }
}
