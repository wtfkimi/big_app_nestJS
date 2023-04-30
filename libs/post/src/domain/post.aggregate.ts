import {IPost} from "@lib/post/domain/post.interface";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {PostServices} from "@lib/post/domain/services";
import {IsBoolean, IsNotEmpty, IsString, IsUUID, validateSync} from "class-validator";
import {Exclude} from "class-transformer";


export class PostAggregate extends PostServices implements IPost {
    @IsUUID('all', {message: 'should be as UUID'})
    id: string = randomStringGenerator();
    @IsString({message: 'should be string'})
    @IsNotEmpty({message: 'should be not null'})
    title: string;
    @IsString({message: 'should be string'})
    @IsNotEmpty({message: 'should be not null'})
    message: string;
    @IsUUID('all', {message: 'should be as UUID'})
    authorId: string
    @IsBoolean()
    @Exclude()
    published = false;
    @IsString()
    createdAt = new Date().toISOString();
    @IsString()
    updatedAt = new Date().toISOString();

    private constructor() {
        super();
    }

    static create(post: Partial<IPost>) {
        const _post = new PostAggregate();
        /** Combine _post which was generated by PostAggregate() and post from param,
         if id is null, id will be generated by PostAggregate, if no, id will be used from post parameter */
        Object.assign(_post, post);
        _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;
        /** whitelist - left field which belong only to current class */
        const errors = validateSync(_post, {whitelist: true});

        if (!!errors.length) {
            throw new Error('Post not valid')
        }
        return _post;
    }

}