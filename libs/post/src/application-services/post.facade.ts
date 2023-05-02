/** Class will be exported outside and hide all realization */
import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { CreatePostDto, UpdatePostDto } from "@lib/post/application-services/commands/dto";
import {
  CreatePostCommand,
  CreatePostCommandHandler,
  DeletePostCommand,
  DeletePostCommandHandler,
  SetPublishedCommand,
  SetPublishedCommandHandler,
  UpdatePostCommand,
  UpdatePostCommandHandler
} from "@lib/post/application-services/commands";
import { GetPostQuery, GetPostsQuery, GetPostsQueryHandler } from "@lib/post/application-services/queries";
import { PaginationDto } from "@lib/shared/dto";


@Injectable()
export class PostFacade {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {


  }

  queries = {
    getPost: (id: string) => this.getPost(id),
    getPosts: (pagination: PaginationDto) => this.getPosts(pagination),
  }
  events = {};
  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    setPublished: (id: string) => this.setPublished(id),
    deletePost: (id: string) => this.deletePost(id),
  };


  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<CreatePostCommand, CreatePostCommandHandler['execute']>(new CreatePostCommand(post))
  }

   private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<UpdatePostCommand, UpdatePostCommandHandler['execute']>(new UpdatePostCommand(post))
  }

   private setPublished(id: string) {
    return this.commandBus.execute<SetPublishedCommand, SetPublishedCommandHandler['execute']>(new SetPublishedCommand(id))
  }

   private deletePost(id: string) {
    return this.commandBus.execute<DeletePostCommand, DeletePostCommandHandler['execute']>(new DeletePostCommand(id))
  }

  private getPost(id: string) {
    return this.queryBus.execute<GetPostQuery, GetPostsQueryHandler['execute']>(new GetPostQuery(id));
  }

  private getPosts(pagination: PaginationDto) {
    return this.queryBus.execute<GetPostsQuery, GetPostsQueryHandler['execute']>(new GetPostsQuery(pagination))
  }


}