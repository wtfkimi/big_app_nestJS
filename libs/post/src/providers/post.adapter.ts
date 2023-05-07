import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {PostRepository} from "@lib/post/providers/post.repository";
import {IPost, PostAggregate} from "@lib/post";
import {PaginationDto} from "@lib/shared/dto";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "@lib/entities";
import {Repository, FindManyOptions} from "typeorm"
import {plainToInstance} from "class-transformer";


@Injectable()
export class PostAdapter implements PostRepository {
    private readonly logger = new Logger(PostAdapter.name);

    async save(post: IPost): Promise<PostAggregate> {
        if (post?.id) {
            const existPost = await this.findOne(post.id);
            if (!existPost) {
                throw new NotFoundException(`Post by id ${post.id} not found`);
            }
            const { id, ...toUpdate} = post;
            await this.postRepository.update({ id }, toUpdate)
            const updatedPost = await this.findOne(post.id);
            return this.findOne(post.id)
        }
        const savedPost = await this.postRepository.save(post);
        return PostAggregate.create(savedPost);
    }

    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) {
    }

    async delete(id: string): Promise<boolean> {
        const res = await this.postRepository.delete({id}).catch(err => {
            this.logger.error(err);
            return false;
        });
        return !!res;
    }

    async findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]> {
        const { limit: take, offset: skip } = plainToInstance(PaginationDto, pagination);
        const options: FindManyOptions<PostEntity> = {
            where: {
                isPublished: true
            },
            take,
            skip,
            order: {
                createdAt: "DESC",
            }
        }
        const [data, count] = await this.postRepository.findAndCount(options).catch(err => {
            this.logger.error(err);
            return [[], 0] as [PostEntity[], number]
        });
        return [
            data.map(post => PostAggregate.create(post)),
            count
        ]
    }

    async findOne(id: string): Promise<PostAggregate | null> {
        const existPost = await this.postRepository.findOneBy({id}).catch(err => {
            this.logger.error(err);
            return null;
        })
        if (!existPost) {
            throw new NotFoundException(`Post by id ${id} not found`);
        }
        return PostAggregate.create(existPost);
    }

}