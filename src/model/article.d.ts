export interface ArticleOutputData {
  id: string;
  createTime: Date;
  title: string;
  cover: string;
  intro: string;
  content: string;
}

export class ArticleInput {
  id?: string;
  createTime?: Date;
  title?: string;
  cover?: string;
  intro?: string;
  content?: string;
}