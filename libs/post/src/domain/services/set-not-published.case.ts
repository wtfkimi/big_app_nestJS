import {IPost} from "@lib/post";

export interface ISetNotPublished {
    setNotPublished(): void
}


/** this - we need access to field of IPost, but param will be undefined */
export const SET_NOT_PUBLISHED = async function (this: IPost) {
    this.published = false;
}