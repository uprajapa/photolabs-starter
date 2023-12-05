import React from "react";

import "../styles/TopicList.scss";
import TopicListItem from "./TopicListItem";


const TopicList = (props) => {
  const { topics, onCategorySelected } = props;
  return (
    <div className="top-nav-bar__topic-list">
      <TopicListItem topics={topics} onCategorySelected={onCategorySelected} />
    </div>
  );
};

export default TopicList;
