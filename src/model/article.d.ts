export interface ArticleOutputData {
  createTime: Date;
  _id: string;
  title: string;
  cover: string;
  intro: string;
}

export class ArticleInput {
  _id?: string;
  createTime?: Date;
  title?: string;
  cover?: string;
  intro?: string;
}