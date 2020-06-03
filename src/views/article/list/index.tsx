import React, { Component } from 'react';
import { Switch, Card, Avatar } from 'antd';
import { getArticles } from '../index.service';

const { Meta } = Card;

class ArticleList extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    this.loadArticles();
  }

  onChange = (checked: boolean) => {
    this.setState({ loading: !checked });
  };

  loadArticles = async () => {
    const data = await getArticles();
    console.log(data)
  }

  render() {
    const { loading } = this.state;

    return (
      <section className="article-list-container">
        <Switch checked={!loading} onChange={this.onChange} />

        <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </section>
    )
  }
}

export default ArticleList;