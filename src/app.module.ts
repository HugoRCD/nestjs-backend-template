import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {join} from 'path';
import {AppResolver} from './app.resolver';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {RoleModule} from './role/role.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import {MailingModule} from "./mailing/mailing.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
            },
        }),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: 'contact@maisonhochard.com',
                        pass: 'zzoplsuvngtsntzt', //TODO : use env variable
                    }
                },
                defaults: {
                    from: 'contact@maisonhochard.com',
                },
                preview: true,
                template: {
                    dir: process.cwd() + '/src/mailing/templates/',
                    adapter: new PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB-HOST'),
                port: parseInt(configService.get('DB-PORT')),
                username: configService.get('DB-USER'),
                password: configService.get('DB-PASSWD'),
                database: configService.get('DB-NAME'),
                entities: [join(__dirname, '**', '*.entity.{ts,js}')],
                synchronize: true,
            }),
        }),
        AuthModule,
        UserModule,
        RoleModule,
        MailingModule
    ],
    controllers: [AppController],
    providers: [AppService, AppResolver],
})
export class AppModule {
}
