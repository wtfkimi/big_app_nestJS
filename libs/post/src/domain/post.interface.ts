export interface IPost {

    /** Identification of post */
    id: string,
    /** Identification of post */
    title: string
    /** Message of post */
    message: string,
    /** Identification author of post */
    authorId: string
    /** When post was published */
    published: boolean,
    /** When post was created */
    createdAt: string,
    /** When post was updated */
    updatedAt: string

}