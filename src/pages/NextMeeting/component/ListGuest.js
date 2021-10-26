import { useState, useEffect } from "react";
import {
  Modal,
  Table,
  Avatar,
  Popconfirm,
  message,
  Button,
  Divider,
  notification,
} from "antd";

import { getListGuest, deleteGuest } from "@/api/nextmeeting";
import {
  LockOutlined,
  UnlockOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import errorHandler from "@/request/errorHandler";

import Mypagination from "./Mypagination";
import AddGuest from "./AddGuest";
import NameSearch from "./NameSearch";

export default function ListGuest({ visible, setVisible }) {
  const [postList, setPostList] = useState({ page: 1, limit: 20, q: "" });
  const [pagination, setPagination] = useState({});
  const [todoList, setToDoList] = useState([]);
  const [addGuest, setAddGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editGuest, setEditGuest] = useState([]);
  const [loadingAddGuest, setLoadingAddGuest] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fecthUserPage = async () => {
      const { data } = await getListGuest(postList);
      try {
        setToDoList(
          data.guests.map((item, index) => {
            return {
              id: item.id,
              key: item.id,
              stt: postList.limit * (postList.page - 1) + (index + 1),
              name: item.full_name,
              email: item.email,
              phone_number: item.phone_number,
              career: item.career,
              company: item.company,
              invited_by: item.invited_by,
            };
          })
        );
        setTimeout(() => {
          setPagination(data.paginate);
          setLoading(false);
        }, 1000);
      } catch (error) {
        errorHandler(error);
      }
    };
    fecthUserPage();
  }, [postList, loadingAddGuest]);

  function handleEdit(item) {
    setEditGuest(item);
    setAddGuest(true);
  }
  function confirm() {
    message.success("Click on Yes");
  }
  async function confirmStatus(item) {
    const result = await deleteGuest(item.id);
    if (result) {
      message.success("Xóa thành công");
      setLoadingAddGuest(!loadingAddGuest);
    }
  }

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  const handleSearch = (searchText) => {
    /*const filteredEvents = todoList.filter(({ name }) => {
      name = name.toLowerCase();
      return name.includes(searchText);
    });*/
    console.log(searchText);
    setPostList({ page: 1, limit: 20, q: searchText });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức Vụ",
      dataIndex: "career",
      key: "career",
    },
    {
      title: "Công ty",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      render: (item) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              type="warning"
              icon={<EditOutlined />}
              onClick={() => handleEdit(item)}
              style={{ marginRight: "5px" }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Xóa người dùng này ?"
              onConfirm={() => confirmStatus(item)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ marginRight: "5px" }}
              >
                Xóa
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        title="Danh sách khách mời"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1200}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <NameSearch onSearch={handleSearch} />
          <Button
            type="success"
            onClick={() => setAddGuest(true)}
            icon={<PlusOutlined />}
          >
            Thêm khách mời
          </Button>
        </div>
        <Table
          className="table-striped-rows"
          style={{
            boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
          }}
          scroll={{ y: 1000 }}
          columns={columns}
          dataSource={todoList}
          pagination={false}
          loading={loading}
        />
        <Divider orientation="right" plain>
          <Mypagination
            props={pagination}
            postList={postList}
            setPagination={setPostList}
            setLoading={setLoading}
          />
        </Divider>
        <AddGuest
          item={editGuest}
          setItem={setEditGuest}
          openAddGuest={addGuest}
          setAddGuest={setAddGuest}
          setLoadingAddGuest={setLoadingAddGuest}
          loadingAddGuest={loadingAddGuest}
        />
      </Modal>
    </>
  );
}
