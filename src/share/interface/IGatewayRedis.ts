/**
 * Interface that parse the information of a gateway from redis
 */
export interface IGatewayRedis {
  uuid: string;
  sockets: string[];
}
