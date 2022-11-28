import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import { join } from 'path';
import * as protobufjs from 'protobufjs';
import { ProtoName } from 'src/share/enums/protoName.enum';

@Injectable()
export class ProtobufService implements OnModuleInit {
  /**
   * Logger instance
   */
  private readonly logger = new Logger(ProtobufService.name);

  /**
   * Root is a config to use root config to proto instance
   */
  private root;

  /**
   * Init and bind onModuleInit to configure .proto file
   * @params null with basic module config to constructor
   */
  constructor() {
    this.onModuleInit = this.onModuleInit.bind(this);
  }

  /**
   * Module called in creation of module
   * @param null not recibe any param
   * @returns null nor return any response
   * This module init with the module is mount
   */
  async onModuleInit() {
    try {
      this.root = await protobufjs.load([
        join(__dirname, '/proto-files-bifrost/protoChat.proto'),
        join(__dirname, '/proto-files-bifrost/protoExternal.proto'),
        join(__dirname, '/proto-files-bifrost/protoGrpc.proto'),
      ]);
    } catch (error) {
      this.logger.error({
        Title: 'Error init config of protobuf to message',
        Error: `[${error.name}]: ${error.message}`,
      });
    }
  }

  /**
   * Function to generate buffer of data
   * @param payload json or object to send and generate buffer
   * @returns Buffer from data of payload
   */
  generateProto(protoName: ProtoName, payload: any): Buffer {
    try {
      const Proto = this.root.lookupType(protoName);

      const errorVerify = Proto.verify(payload);
      if (errorVerify) throw Error(errorVerify);

      const message = Proto.create(payload);
      const bufferTemp = Proto.encode(message).finish();

      return bufferTemp;
    } catch (error) {
      this.logger.error({
        Title: 'Error generate protobuf from message',
        Error: `[${error.name}]: ${error.message}`,
      });
      return null;
    }
  }

  /**
   * Function to generate buffer of data
   * @param payload json or object to send and generate buffer
   * @returns Buffer from data of payload
   */
  decompressProto(protoName: ProtoName, buffer): any {
    try {
      const messageBufferAscii = Buffer.from(buffer, 'ascii');
      const Proto = this.root.lookupType(protoName);

      const debuf = Proto.decode(messageBufferAscii);
      const payload: any = debuf.toJSON();
      return payload;
    } catch (error) {
      this.logger.error({
        Title: 'Error generate protobuf from message',
        Error: `[${error.name}]: ${error.message}`,
      });
      return null;
    }
  }
}
