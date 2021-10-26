import React, { useState } from 'react';
import { Input, Table } from 'antd';

export default function NameSearch({ onSearch }) {
  const [value, setValue] = useState('');
  const Search = Input.Search;
  return (
      <Search
        placeholder="Search Name"
        value={value}
        onChange={(e) => {
          const currValue = e.target.value;
          setValue(currValue);
          onSearch(currValue);
        }}
        style={{ width: 300 }}
      />
  );
}
