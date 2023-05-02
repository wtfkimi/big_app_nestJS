import { IPost, PostAggregate } from "@lib/post";
import { PaginationDto } from "@lib/shared/dto";


export abstract class PostRepository {

  abstract save(post: IPost): Promise<PostAggregate>

  abstract findOn(id: string): Promise<PostAggregate | null>

  abstract findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]>; // need check if correct

  abstract delete(id: string): Promise<boolean>;
}