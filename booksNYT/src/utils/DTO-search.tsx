export interface DataGetDTO {
    title: string,
    description: string,
    contributor: string,
    author: string,
    contributor_note: string,
    price: number,
    age_group: string,
    publisher: string,
    isbns: {
        isbn10: string,
        isbn13: string
    }[],
    ranks_history: {
        primary_isbn10: string | number,
        primary_isbn13: string | number,
        rank: number,
        list_name: string,
        display_name: string,
        published_date: string,
        bestsellers_date: string,
        weeks_on_list: number,
        ranks_last_week: string | number,
        asterisk: number,
        dagger: number
    }[],
    reviews:
    {
        book_review_link: string,
        first_chapter_link: string,
        sunday_review_link: string,
        article_chapter_link: string
    }[]
}

export interface DataSearch {
    id: string,
    title: string,
    description: string,
    contributor: string,
    author: string,
    publisher: string,
    ranksHistory: {
        isbn10: string | number,
        isbn13: string | number,
        rank: number,
        list: string,
        display: string,
        publishedDate: string,
        bestsellersDate: string,
        weeksOnList: number,
        rankLastWeek: string | number,
        asterisk: number,
        dagger: number
    }[],
}

export const dataSearchFromDTO: (dto: DataGetDTO) => DataSearch = ({
    title,
    description,
    contributor,
    author,
    publisher,
    ranks_history,
}) => ({
    id: crypto.randomUUID(),
    title: title,
    description: description,
    contributor: contributor,
    author: author,
    publisher: publisher,
    ranksHistory:
        ranks_history.map((item) => ({
            isbn10: item.primary_isbn10,
            isbn13: item.primary_isbn13,
            rank: item.rank,
            list: item.list_name,
            display: item.display_name,
            publishedDate: item.published_date,
            bestsellersDate: item.bestsellers_date,
            weeksOnList: item.weeks_on_list,
            rankLastWeek: item.ranks_last_week,
            asterisk: item.asterisk,
            dagger: item.dagger,
        })),
});