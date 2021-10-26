import React, { useEffect, useState } from "react";
import moment from "moment";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import {
  message,
  Upload,
  PageHeader,
  Button,
  Divider,
  Layout,
  Spin,
  Image,
  Space,
  DatePicker,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import uniqueId from "@/utils/uinqueId";
import { logout } from "@/redux/auth/actions";
import errorHandler from "@/request/errorHandler";
import HeaderContent from "@/layout/HeaderContent";

import UpAvatar from "@/api/uploadImage";
import { getQR, getNextMeeting, upTime, upBanner } from "@/api/nextmeeting";
import ListGuest from "./component/ListGuest";
const { Content } = Layout;
export default function NextMeeting() {
  const dispatch = useDispatch();
  const [src, setSrc] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [srcImage, setSrcImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [editTime, setEditTime] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);

  const [openListGuest, setOpenListGuest] = useState(false);
  useEffect(() => {
    const fecthPage = async () => {
      const response = await getQR();
      const res = await getNextMeeting();
      try {
        const { data } = response;
        setSrc(data.qr_code);
        setLoading(false);
        setStartTime(
          moment(res.meeting.start_time).utc().format("YYYY-MM-DD HH:mm:ss")
        );
        setEndTime(
          moment(res.meeting.end_time).utc().format("YYYY-MM-DD HH:mm:ss")
        );
        setSrcImage(res.meeting.banner);
      } catch (error) {
        errorHandler(error);
        dispatch(logout());
      }
    };
    fecthPage();
  }, []);
  const uploadImage = async (options) => {
    const { file } = options;
    const fmData = new FormData();
    fmData.append("files[]", file);
    setLoadingImage(true);
    try {
      const { data } = await UpAvatar(fmData);
      if (data[0]) {
        setSrcImage(data[0]);
        const params = {
          banner: data[0],
        };
        await upBanner(params);
        setLoadingImage(false);
      }
    } catch (error) {
      message.error(error);
      setLoadingImage(false);
    }
    //data[0] là link img
  };

  const dateFormat = "YYYY-MM-DD HH:mm:ss";

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current <= moment().endOf("day");
  }

  function updateStartime(d, dataString) {
    setStartTime(dataString);
  }
  function updateEndtime(d, dataString) {
    setEndTimeTime(dataString);
  }
  const upDateTime = async () => {
    setLoadingButton(true);
    
    const meeting = {
      start_time: new Date(Date.parse(start_time)),
      end_time: new Date(Date.parse(end_time)),
    };
    const response = await upTime(meeting);
    try {
      setTimeout(() => {
        setLoadingButton(false);
        setEditTime(true);
      }, 2000);
    } catch (error) {
      errorHandler(error);
    }
  };
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
          <div>
            <PageHeader
              onBack={() => window.history.back()}
              title="Quản lí cuộc hợp"
              ghost={false}
              extra={[
                <Button
                  type="success"
                  icon={<PlusOutlined />}
                  key={`${uniqueId()}`}
                  onClick={() => setOpenListGuest(true)}
                >
                  Danh sách khách mời
                </Button>,
                ,
              ]}
              style={{
                padding: "20px 0px",
              }}
            ></PageHeader>
            <Spin spinning={loading} tip="Loading...">
              <div
                style={{
                  border: "1px solid",
                  padding: "10px",
                  boxShadow: "5px 5px #888888",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>
                    Thời gian bắt đầu:{" "}
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      disabledDate={disabledDate}
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                      }}
                      value={moment(
                        start_time ? start_time : "2021-10-25 01:00:00",
                        dateFormat
                      )}
                      disabled={editTime}
                      onChange={updateStartime}
                    />
                  </h4>
                  <h4>
                    Thời gian kết thúc:{" "}
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      disabledDate={disabledDate}
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                      }}
                      value={moment(
                        end_time ? end_time : "2021-10-25 01:00:00",
                        dateFormat
                      )}
                      disabled={editTime}
                      onChange={updateEndtime}
                    />
                  </h4>
                  {editTime ? (
                    <Button onClick={() => setEditTime(false)}>Edit</Button>
                  ) : (
                    <div>
                      <Button
                        style={{ marginRight: "10px" }}
                        type="success"
                        onClick={upDateTime}
                        loading={loadingButton}
                      >
                        Cập nhật
                      </Button>
                      <Button danger onClick={() => setEditTime(true)}>
                        Hủy
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}
              >
                <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <h3>Mã QR</h3>
                  <QRCode value="" size={180} />
                </div>
                <div>
                  <Space size={12}>
                    <Spin spinning={loadingImage}>
                      <Image width={180} src={srcImage} />
                    </Spin>
                    <Upload
                      accept="image/*"
                      customRequest={uploadImage}
                      showUploadList={false}
                    >
                      <Button type="primary" onClick={() => {}}>
                        Edit Banner
                      </Button>
                    </Upload>
                  </Space>
                </div>
              </div>
            </Spin>
          </div>
          <ListGuest visible={openListGuest} setVisible={setOpenListGuest} />
        </Content>
      </Layout>
    </Layout>
  );
}
