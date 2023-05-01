/** Class will be exported outside and hide all realization */
import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";

@Injectable()
export class PostFacade {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {


  }

  queries = {}
  events = {};
  commands = {};
}