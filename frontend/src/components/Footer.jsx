import { Outlet, Link as ReachLink } from "react-router-dom";
import Logo from "../assets/LogoPossible.png";
import { MenuIcon, SearchIcon } from "../assets/icons";
import { Button, Form, Modal, Input, notification } from "antd";
import axios from "axios";

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  useBreakpointValue,
  Heading,
  Image,
} from "@chakra-ui/react";
import CustomLink from "./CustomLink";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

export const Footer = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [editorContent, setEditorContent] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

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
        console.log("Ticket créé avec succès !");
        // console.log(response.data);
        setOpen(false);
        setConfirmLoading(false);
        setTimeout(() => {
          openNotification();
        }, 500);
        setCaseTitle("");
        setEditorContent("");
        setModalText("");
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
    console.log("Clicked cancel button");
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

  useEffect(() => {
    console.log(editorContent);
    console.log(caseTitle);
  }, [editorContent, caseTitle]);

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
      <Container
        py={{
          base: "4",
          lg: "6",
        }}
        maxW="container.xl"
        mt={20}
      >
        <Flex
          gap="10"
          direction={{ base: "column", md: "row" }}
          as="footer"
          bg="bg-surface"
          borderStyle="solid"
          borderColor="gray.100"
          borderTopWidth={1}
          py={{
            base: "2",
            lg: "3",
          }}
          minW="full"
          alignItems="center"
          justifyContent={{ base: "center", md: "space-between" }}
        >
          <Box w={{ base: "30%", md: "10%" }} h="70px" as="a" href="/">
            <Image src={Logo} fit="contain" w="100%" h="100%" />
          </Box>

          <Flex
            justifyContent={{ base: "center", md: "flex-end" }}
            alignItems="center"
            w={{ base: "100%", md: "50%" }}
          >
            <ButtonGroup variant="link" spacing="5">
              {/* {[
                {
                  name: "Tableau de bord",
                  link: "https://dashboard.possible.africa",
                },
                { name: "Reporter un bug", link: "#" },
              ].map((item) => (
                <CustomLink
                  key={item.name}
                  as={ReachLink}
                  to={item.link}
                  target="_blank"
                >
                  <Heading size="sm" fontWeight="400">
                    {item.name}
                  </Heading>
                </CustomLink>
              ))} */}
              <CustomLink
                key="Tableau de bord"
                as={ReachLink}
                to="https://app.possible.africa"
                target="_blank"
              >
                <Heading size="sm" fontWeight="400">
                  Tableau de bord
                </Heading>
              </CustomLink>
              <CustomLink
                key="Reporter un bug"
                as={ReachLink}
                // to="#"
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  showModal();
                }}
              >
                <Heading size="sm" fontWeight="400">
                  Reporter un bug
                </Heading>
              </CustomLink>
              {/* <Button style={{
                border: "none"
              }} onClick={showModal}>
                Reporter Un Bug
              </Button> */}
            </ButtonGroup>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
