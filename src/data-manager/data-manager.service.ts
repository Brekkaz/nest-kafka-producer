import { Injectable } from '@nestjs/common';
import { IUserDirectory } from '../share/models/User';
import { ProduccerService } from '../producer/produccer.service';
import { ProtobufService } from '../protobuf/protobuf.service';
import { randomUUID } from 'crypto';

@Injectable()
export class DataManagerService {
  constructor(
    private kafkaProduccerService: ProduccerService,
    private protobufService: ProtobufService,
  ) {}

  async setUserDirectory(UserInformationDirectory: IUserDirectory) {
    try {
      //console.log(UserInformationDirectory);
      const message = this.protobufService.generateProto(
        'UserSocketConnected',
        {
          UserID: UserInformationDirectory.userID + '',
          UserSocketID: UserInformationDirectory.SocketID + '',
        },
      );

      const uuidV4 = randomUUID();

      await this.kafkaProduccerService.produce(
        process.env.KAFKA_TOPIC_SOCKER_USER_CONNECT,
        [
          {
            headers: {
              eventName: 'user-connected-socket',
              source: process.env.KAFKA_CLIENT_ID
                ? process.env.KAFKA_CLIENT_ID
                : 'test_client',
            },
            key: `${uuidV4}`,
            value: message,
            timestamp: '' + Date.now(),
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  }
}
