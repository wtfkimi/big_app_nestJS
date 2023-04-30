import {IPost} from "@lib/post";

export interface ISetPublished {
    setPublished(): void
}


/** this - we need access to field of IPost, but param will be undefined */
export const SET_PUBLISHED = async function (this: IPost) {
    this.published = true;
}