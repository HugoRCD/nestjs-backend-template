import {Injectable} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {User} from "../user/entities/user.entity";

@Injectable()
export class MailingService {
    constructor(
        private readonly mailerService: MailerService
    ) {
    }

    public sendMail(user: User, template: string, subject: string, variables: any): void {
        this.mailerService
            .sendMail({
                to: user.email,
                subject: subject,
                template: template,
                context: variables,
            })
            .then(() => {
            })
            .catch(Error => {
                console.log(Error);
            });
    }
}
