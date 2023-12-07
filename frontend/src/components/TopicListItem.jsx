import React from "react";

import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {
  const { topics, onCategorySelected } = props;
  let output = topics.map(data => {
    return (
      <div className="topic-list__item" key={data.id} onClick={() => onCategorySelected(data.id)}>
        <span>{data.title}</span>
      </div>
    );
  });

  return (
    <>
      {output}
    </>
  );
};

export default TopicListItem;
