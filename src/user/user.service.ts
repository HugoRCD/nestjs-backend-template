import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserInput} from "./dto/user-create.input";
import {User} from "./entities/user.entity";
import {MailingService} from "../mailing/mailing.service";
import {UpdateUserInput} from "./dto/user-update.input";
import {JWTPayload} from "../auth/auth.service";
import {VerifCode} from "./entities/verif-code.entity";
import {Utils} from "./utils/utils";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(VerifCode)
      private verifCodeRepository: Repository<VerifCode>,
      private MailingService: MailingService,
  ) {
  }

  async create(user: CreateUserInput) {
    if (await this.getUserByLogin(user.email) || await this.getUserByLogin(user.username) || await this.getUserByLogin(user.phone)) {
      throw new Error("User already exists");
    }
    const password = await Utils.hashPassword(user.password);
    const createdUser = this.userRepository.create({
      ...user,
      password,
    });
    await this.userRepository.save(createdUser);
    const verifCode = await this.createVerificationCode(user.email, false);
    this.MailingService.sendMail(createdUser, "welcome", "Welcome !!!",
      {
        username: createdUser.username,
        code: verifCode.code,
      });
    return createdUser;
  }

  async update(user: UpdateUserInput, id: number) {
    const userToUpdate = await this.userRepository.findOne(id);
    if (userToUpdate) {
      const password = await Utils.hashPassword(user.password);
      await this.userRepository.update(id, {
        ...user,
        password,
      });
      return await this.userRepository.findOne(id);
    }
    throw new Error("User not found");
  }

  async delete(id: number): Promise<string> {
    const user = await this.userRepository.findOne(id);
    await this.userRepository.remove(user);
    return "User deleted " + id + " deleted successfully";
  }

  async getUserByLogin(login: string): Promise<User> {
    return this.userRepository.findOne({where: [{email: login}, {username: login}, {phone: login}]});
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createVerificationCode(email: string, sendMail = false): Promise<VerifCode> {
    const verif_code = new VerifCode();
    verif_code.email = email;
    verif_code.code = Math.floor(100000 + Math.random() * 900000).toString();
    const verifCode = this.verifCodeRepository.create(verif_code);
    await this.verifCodeRepository.save(verifCode);
    const user = await this.userRepository.findOne({where: {email: email}});
    if (sendMail) {
      this.MailingService.sendMail(user, "verifCode", "Verification code",
        {
          username: user.username,
          code: verifCode.code,
        }
      );
    }
    return verif_code;
  }

  async verify(user: JWTPayload, code: string): Promise<User> {
    const userToVerify = await this.userRepository.findOne(user.id);
    const verifCode = await this.verifCodeRepository.findOne({where: {code: code, email: userToVerify.email}});
    if (verifCode.code === code) {
      userToVerify.isVerified = true;
      await this.userRepository.save(userToVerify);
      await this.verifCodeRepository.remove(verifCode);
      await this.verifCodeRepository.delete({email: userToVerify.email});
      return userToVerify;
    }
    await this.verifCodeRepository.delete({email: userToVerify.email});
  }

  async insertToken(user: number, token: string) {
    const userToInsert = await this.userRepository.findOne(user);
    userToInsert.token = token;
    await this.userRepository.save(userToInsert);
  }
}
