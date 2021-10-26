import React, { useState } from "react";
import { Pagination } from "antd";

export default function Mypagination({
  props,
  setPagination,
  setLoading,
  postList,
}) {
  const { total_pages, total_objects } = props;
  const [current, setCurrent] = useState(1);

  const onChange = (page, pageSize) => {
    setCurrent(page);
    setPagination({
      ...props,
      page: page,
      limit: pageSize,
    });
    setLoading(true);
  };

  return (
    <Pagination
      current={current}
      total={total_objects}
      onChange={onChange}
      pageSizeOptions={["10", "20", "30"]}
      showSizeChanger
    />
  );
}
