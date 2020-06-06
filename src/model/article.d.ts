export interface ArticleOutputData {
  createTime: Date;
  id: string;
  title: string;
  cover: string;
  intro: string;
}

export class ArticleInput {
  id?: string;
  createTime?: Date;
  title?: string;
  cover?: string;
  intro?: string;
}