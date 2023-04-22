import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'config';
import { firstValueFrom, map } from 'rxjs';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class UserService {
  public constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly emailService: KafkaService,
  ) {}

  public async getAllUsers() {
    const userServiceUrl = this.config.get().userServiceUrl;
    const userServicePort = this.config.get().userServicePort;

    return await firstValueFrom(
      this.httpService
        .get(`http://${userServiceUrl}:${userServicePort}`)
        .pipe(map((response) => response.data)),
    );
  }
}
