import { IPost, PostAggregate } from "@lib/post";


export abstract class PostRepository {

  abstract save(post: IPost): Promise<PostAggregate>

  abstract findOn(id: string): Promise<PostAggregate | null>

  abstract findAll(): Promise<[PostAggregate[], number]>; // need check if correct

  abstract delete(id: string): Promise<boolean>;
}