interface DataGetDTO {
    author: string,
    buy_links: {
        name: string;
        url: string;
    }[],
    description: string,
    publisher: string,
    rank: number,
    title: string,
    book_image: string,
    book_image_width: number
}

export interface Data {
    author: string,
    links: {
        name: string;
        url: string;
    }[],
    description: string,
    publisher: string,
    id: number,
    title: string,
    image: string,
    width: number
}

export const dataFromDTO: (dto: DataGetDTO) => Data = ({
    author,
    buy_links,
    description,
    publisher,
    rank,
    title,
    book_image,
    book_image_width,
}) => ({
    author: author,
    links: buy_links,
    description: description,
    publisher: publisher,
    id: rank,
    title: title,
    image: book_image,
    width: book_image_width
});