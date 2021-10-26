import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { getOnSearchMembers } from "@/api/member";
import { addGuest, editGuest } from "@/api/nextmeeting";
export default function AddGuest({
  item,
  setItem,
  openAddGuest,
  setAddGuest,
  loadingAddGuest,
  setLoadingAddGuest,
}) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [listMember, setListMember] = useState([]);
  useEffect(() => {
    item.id
      ? form.setFieldsValue(
          {
            full_name: item ? item.name : "",
            email: item ? item.email : "",
            phone_number: item ? item.phone_number : "",
            user_id: item ? item.invited_by.id : "",
            career: item ? item.career : "",
            company: item ? item.company : "",
          },
          setListMember([item.invited_by])
        )
      : form.setFieldsValue(setConfirmLoading(false));
  }, [openAddGuest]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        values.phone_number = values.phone_number.replace("0", "+84");
        const guest = {
          guest: values,
        };
        if (item.id) {
          const response = await editGuest(item.id, guest);
          console.log(response);
        } else {
          const response = await addGuest(guest);
          console.log(response);
        }
        setItem("");
        setAddGuest(false);
        form.resetFields();
        setLoadingAddGuest(!loadingAddGuest);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    //
  };
  const handleCancel = () => {
    form.resetFields();
    setItem("");
    setAddGuest(false);
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
    (async () => {
      const { data } = await getOnSearchMembers(val);
      try {
        setListMember(
          data.users.map((item, index) => {
            return {
              id: item.id,
              key: item.id,
              full_name: item.full_name,
            };
          })
        );
      } catch (error) {}
    })();
  }
  const options = listMember.map((item) => {
    return (
      <Option key={item.id} value={item.id}>
        {item.full_name}
      </Option>
    );
  });

  return (
    <>
      <Modal
        title="Thêm khách mời"
        centered
        visible={openAddGuest}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        confirmLoading={confirmLoading}
        okText={item.id ? "Cập nhật" : "Thêm"}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            label="Họ và Tên"
            name="full_name"
            rules={[
              {
                required: true,
                message: "Please input your full_name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              paddingRight: "5px",
            }}
          >
            <Input placeholder="abc@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              paddingLeft: "5px",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Công ty"
            name="company"
            rules={[
              {
                required: true,
                message: "Please input your company!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              paddingRight: "5px",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chức vụ"
            name="career"
            rules={[
              {
                required: true,
                message: "Please input your career!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50%)",
              paddingRight: "5px",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Người giới thiệu"
            name="user_id"
            rules={[
              {
                required: true,
                message: "Không được để trống người giới thiệu!",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: "50%" }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
