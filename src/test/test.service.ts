import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Cronos, CronosKey } from './cronos.interface';

@Injectable()
export class TestService {
  constructor(
    @InjectModel('cronos')
    private cronosModel: Model<Cronos, CronosKey>,
  ) {}

  create(test: Cronos) {
    return this.cronosModel.create(test);
  }
  /*
  update(key: UserKey, user: Partial<User>) {
    return this.userModel.update(key, user);
  }

  findOne(key: UserKey) {
    return this.userModel.get(key);
  }
*/
  findAll() {
    return this.cronosModel.scan().exec();
  }
}
