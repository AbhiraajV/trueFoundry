import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from './strategy';
import { ConfigService } from '@nestjs/config';
import { GithubStrategy } from './strategy/github.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'true_foundry',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://xsracole:Xhv1RXdF5GVSwOCRfqNp785dauTCuxkC@puffin.rmq2.cloudamqp.com/xsracole',
          ],
          queue: 'gh_service_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: '10h' },
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratergy, GithubStrategy],
})
export class AuthModule {}
