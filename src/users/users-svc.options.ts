import { join } from 'path'
import { ClientOptions, Transport } from '@nestjs/microservices'

export const UsersServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:50051',
    package: 'user',
    protoPath: join(__dirname, '../../_proto/user.proto'),
    loader: {
      keepCase: true,
      enums: String,
      oneofs: true,
      arrays: true
    }
  }
}
