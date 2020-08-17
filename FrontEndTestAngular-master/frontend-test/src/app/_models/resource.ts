export class Resource {
    page: Number;
    per_page: Number;
    total: Number;
    total_pages: Number;
    data:{
        id: Number;
        name: string;
        year: Number;
        color: string;
        pantone_value: string;
    }[]
}