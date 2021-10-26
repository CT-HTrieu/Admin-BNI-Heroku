import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { createMember } from "@/api/member";
export default function Addmember({ addMember, setAddMember }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    form.setFieldsValue(setConfirmLoading(false));
  }, []);
 
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        values.phone_number = values.phone_number.replace("0", "+84");
        const user = {
          user: values,
        };
        const { response } = await createMember(user);
        if (!response.data.status) {
          form.setFields([
            {
              name: "email",
              errors: [response.data.error.message],
            },
          ]);
        } else {
          setAddMember(false);
          form.resetFields();
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    //
  };
  const handleCancel = () => {
    form.resetFields();
    setAddMember(false);
  };
  return (
    <>
      <Modal
        title="Thêm Member"
        centered
        visible={addMember}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        confirmLoading={confirmLoading}
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
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("old") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords you entered are the same!")
                  );
                },
              }),
            ]}
            //  hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
            dependencies={["password"]}
            //  hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
