import { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  Popconfirm,
  message,
  Button,
  Divider,
  notification,
} from "antd";
import Highlighter from "react-highlight-words";
import { UpdateMemberAction } from "@/api/member";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import EmailSearch from "./SearchName";

export default function ListMember({
  todoList,
  loading,
  pagination,
  setPagination,
  setPostList,
  setToDoList,
}) {
  const [value, setValue] = useState([]);
  useEffect(() => {
    console.log("Loading");
  }, [todoList]);
  function confirm() {
    message.success("Click on Yes");
  }
  function confirmStatus(item, index) {
    item.loadingButton = true;
    const loading = [...todoList];
    setToDoList(loading);
    const updateStatus = async () => {
      const response = await UpdateMemberAction(item.id);
      const tamp = todoList.find((el) => el.id === item.id);
      item.loadingButton = false;
      if (response.response.status) {
        notification.error({
          message: item.status
            ? "Khóa không thành công"
            : "Kích hoạt không thành công",
          description: response.response.data.error.message,
        });
      } else {
        if (!item.status && response.success)
          message.success("Kích hoạt thành công");
        if (item.status && response.success) message.success("Khóa thành công");
        tamp.status = !item.status;
      }
      setTimeout(() => {
        const tmp = [...todoList];
        setToDoList(tmp);
      }, 1000);
      //tmp[index - 1] = { ...tmp[index - 1], status: !item.status };
    };
    updateStatus();
  }

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  const handleSearch = (searchText) => {
    setValue([searchText]);
    const filteredEvents = todoList.filter(({ email }) => {
      email = email.toLowerCase();
      return email.includes(searchText);
    });
    setToDoList(filteredEvents);
    setPostList({
      q: searchText,
      page: 1,
      limit: pagination.limit,
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "8%",
    },
    {
      title: "Chức Vụ",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Highlighter
          highlightClassName="YourHighlightClass"
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={value}
          autoEscape={true}
          textToHighlight={email}
        />
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => {
        return <Avatar src={avatar} style={{ width: 70, height: 70 }} />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, item) => {
        return (
          <div>
            <Popconfirm
              title={
                status ? "Khóa người dùng này ?" : "Kích hoạt người dùng này ?"
              }
              onConfirm={() => confirmStatus(item, item.stt)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              {status ? (
                <Button
                  type="primary"
                  icon={<UnlockOutlined />}
                  loading={item.loadingButton}
                >
                  Active
                </Button>
              ) : (
                <Button
                  type="danger"
                  icon={<LockOutlined />}
                  loading={item.loadingButton}
                >
                  No active
                </Button>
              )}
            </Popconfirm>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => a.status - b.status,
        multiple: 2,
      },
    },
  ];
  return (
    <>
      <Divider orientation="right">
        <EmailSearch onSearch={handleSearch} />
      </Divider>
      <Table
        className="table-striped-rows"
        // eslint-disable-next-line react/jsx-no-duplicate-props
        scroll={{ y: 500 }}
        columns={columns}
        dataSource={todoList}
        pagination={false}
        loading={loading}
        // expandedRowRender={(item) => {}}
      />
    </>
  );
}
