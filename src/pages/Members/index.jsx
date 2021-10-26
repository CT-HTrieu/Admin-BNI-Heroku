import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Table, PageHeader, Button, Divider, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import uniqueId from "@/utils/uinqueId";
import { logout } from "@/redux/auth/actions";
import * as member from "@/api/member";
import Listmember from "./component/Listmember";
import Mypagination from "./component/Mypagination";
import errorHandler from "@/request/errorHandler";
import HeaderContent from "@/layout/HeaderContent";
import Addmember from "./component/Addmember";
const { Content } = Layout;
export default function Members() {
  const [todoList, setToDoList] = useState();
  const [postList, setPostList] = useState({ page: 1, limit: 10 ,q:""});
  const [pagination, setPagination] = useState({});
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addMember, setAddMember] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fecthUserPage = async () => {
      const response = await member.getAllMembers(postList);
      try {
        const { data } = response;
        setToDoList(
          data.users.map((item, index) => {
            return {
              id: item.id,
              key: item.id,
              stt: postList.limit * (postList.page - 1) + (index + 1),
              name: item.full_name,
              email: item.email,
              phone: item.phone_number,
              title: item.title,
              status: item.active,
              avatar: item.avatar,
              loadingButton: false,
            };
          })
        );
        setTimeout(() => {
          setShowList(true);
          setLoading(false);
        }, 1000);
        setPagination(data.paginate);
      } catch (error) {
        errorHandler(error);
        dispatch(logout());
      }
    };
    fecthUserPage();
  }, [postList]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "3.6667%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "11.1111%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: '11.1111%',
      width: "20.94445%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "33.3333%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "12.1111%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "6%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "11.83335%",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <HeaderContent />
        <Content
          className="site-layout-background"
          style={{
            padding: "50px 40px",
            margin: "15px auto",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {" "}
          <div>
            <PageHeader
              onBack={() => window.history.back()}
              title="Quản lý Member"
              ghost={false}
              extra={[
                <Button
                  type="success"
                  icon={<PlusOutlined />}
                  onClick={() => setAddMember(true)}
                  key={`${uniqueId()}`}
                >
                  New member
                </Button>,
                ,
              ]}
              style={{
                padding: "20px 0px",
              }}
            ></PageHeader>
            {showList ? (
              <Listmember
                showList={showList}
                todoList={todoList}
                loading={loading}
                pagination={postList}
                setPagination={setPagination}
                setPostList={setPostList}
                setToDoList={setToDoList}
              />
            ) : (
              <Table columns={columns} loading={loading} />
            )}
            <Divider orientation="right" plain>
              <Mypagination
                props={pagination}
                postList={postList}
                setPagination={setPostList}
                setLoading={setLoading}
              />
            </Divider>
            <Addmember addMember={addMember} setAddMember={setAddMember} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
