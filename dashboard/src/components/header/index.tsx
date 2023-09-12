import { BugFilled, DownOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  useGetIdentity,
  useGetLocale,
  useLink,
  useRouterContext,
  useRouterType,
  useSetLocale,
} from "@refinedev/core";
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  Layout as AntdLayout,
  MenuProps,
  Modal,
  notification,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";
import ReactQuill from "react-quill";
import axios from "axios";
import { useContextSelector } from "use-context-selector";
import { userContext } from "../../UserContext";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  role: string;
  roleSlug: string;
  username: string;
  lastname: string;
  firstname: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
}) => {
  const { token } = useToken();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);
  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [editorContent, setEditorContent] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const setUserD = useContextSelector(userContext, (v) => v[1]);
  const userD = useContextSelector(userContext, (v) => v[0].user);
  const currentLocale = locale();

  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: lang === "fr" ? "Français" : lang === "en" ? "English" : "Deutsch",
    }));

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "70px",
  };

  if (isSticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const showModal = () => {
    setOpen(true);
  };

  const createAsanaTicket = async (title, description) => {
    const apiKey = "1/1204420428930521:406ac36389af52dbfc338c4a002e7ffb";
    const projectId = "1204855739325970";

    // convert html in text
    const text = description.replace(/<[^>]+>/g, "");
    // const text = description;

    try {
      const response = await axios.post(
        `https://app.asana.com/api/1.0/tasks`,
        {
          data: {
            projects: [projectId],
            name: title,
            notes: text,
          },
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (response.status === 201) {
        // console.log("Ticket créé avec succès !");
        // console.log(response.data);
        setOpen(false);
        setConfirmLoading(false);
        setCaseTitle("");
        setEditorContent("");
        setModalText("");
        setTimeout(() => {
          openNotification();
        }, 500);
      } else {
        console.log("Erreur lors de la création du ticket.");
        setConfirmLoading(false);
      }
    } catch (error) {
      console.log("Erreur lors de la création du ticket :", error);
      setConfirmLoading(false);
    }
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    createAsanaTicket(caseTitle, editorContent);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
  };

  const openNotification = () => {
    api.success({
      message: "Rapport de bug envoyé !",
      description:
        "Votre rapport de bug a bien été envoyé à notre équipe. Nous vous remercions pour votre aide.",
      icon: <BugFilled style={{ color: "#52c41a" }} />,
    });
  };
  const reactQuillModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["formula"],
        ["clean"],
      ],
    },
  };

  // useEffect(() => {
  //   if (!userRecharded) {
  //     const localStorageToken = localStorage.getItem("refine-auth");
  //     if (localStorageToken) {
  //       if (localStorageToken != localStorage.getItem("refine-auth")) {
  //         window.location.reload();
  //         console.log("reloading");
  //       }
  //       const key = import.meta.env.VITE_JWT_SECRET;
  //       const decoded: { user: any; iat: number; exp: number } = jwt_decode(
  //         localStorageToken,
  //         key
  //       );
  //       setUserD((s) => ({
  //         ...s,
  //         user: { ...decoded.user },
  //       }));
  //       setHeaderRecharged((s) => ({
  //         ...s,
  //         headerRecharged: true,
  //       }));
  //       console.info("Haeder.tsx");
  //       // setUserConnected({ ...decoded.user });
  //     }
  //   }
  // }, []);

  return (
    <>
      {contextHolder}
      <Modal
        style={{
          height: "80vh",
        }}
        width="80vw"
        title="Reporter un bug, sur l'utilisation de l'application"
        open={open}
        onOk={editorContent && caseTitle ? handleOk : null}
        okButtonProps={{ size: "large" }}
        cancelButtonProps={{ size: "large" }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* Markdown Editor Editor */}
        <Form layout="vertical">
          <Form.Item
            label="Titre"
            name="title"
            rules={[{ required: true, message: "Veuillez entrer un titre" }]}
          >
            <Input
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Veuillez entrer une description" },
            ]}
          >
            <ReactQuill
              style={{ height: "30vh", width: "100%" }}
              modules={reactQuillModules}
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
              placeholder="Placez votre contenu ici..."
            />
          </Form.Item>
        </Form>
      </Modal>
      <AntdLayout.Header style={headerStyles}>
        <Space>
          <Button type="primary" onClick={showModal}>
            Reporter Un Bug
          </Button>
          <Dropdown
            menu={{
              items: menuItems,
              selectedKeys: currentLocale ? [currentLocale] : [],
            }}
          >
            <Button type="text">
              <Space>
                <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
                {currentLocale === "fr"
                  ? "Français"
                  : currentLocale === "en"
                  ? "English"
                  : "Deutsch"}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            defaultChecked={mode === "light"}
          />
          <Space style={{ marginLeft: "8px" }} size="middle">
            {userD?.lastname && (
              <Link to="profil">
                <Text ellipsis={true} strong>
                  {userD.lastname} {userD.firstname}
                </Text>
              </Link>
            )}
            <Link to="profil">
              <Avatar
                src={
                  userD?.avatar ||
                  "https://possibledotafrica.s3.eu-west-3.amazonaws.com/users/images/1688567211420-image.png"
                }
                alt={userD?.firstname}
              />
            </Link>
          </Space>
        </Space>
      </AntdLayout.Header>
    </>
  );
};
