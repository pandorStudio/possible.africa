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
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

export const Footer = () => {
  const [open, setOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [editorContent, setEditorContent] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [emailForNewsletter, setEmailForNewsletter] = useState("");
  const [api, contextHolder] = notification.useNotification();
  // const [modal, modalContextHolder] = Modal.useModal();

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  const newsletterInputRef = useRef(null);

  const showModal = () => {
    setOpen(true);
  };

  // const { confirm } = Modal;

  const showNewsletterModal = () => {
    setNewsletterModalOpen(true);
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
    setModalText("Le modal se détruira dans 2 minutes !");
    setConfirmLoading(true);
    createAsanaTicket(caseTitle, editorContent);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancelNewsletterModal = async () => {
    // console.log("Clicked cancel button");
    newsletterInputRef.current.value = "";
    newsletterInputRef.current.input.defaultValue = "";
    document.getElementById("newsletterForm").value = "";
    // console.log(document.getElementById("newsletterForm"));
    // console.log(newsletterInputRef?.current?.value, "current");
    // console.log(newsletterInputRef);
    setNewsletterModalOpen(false);
  };

  const handleOkNewsletterModal = () => {
    // console.log("Ok clicked in suscribing to Newsletters !");
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
    // console.log(editorContent);
    // console.log(newsletterInputRef?.current?.value, "Loaded");
    // console.log(emailForNewsletter);
  }, [editorContent, caseTitle, newsletterInputRef?.current?.value]);

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
        okText="Envoyer"
        cancelText="Annuler"
        onOk={editorContent && caseTitle ? handleOk : null}
        okButtonProps={{ size: "large" }}
        cancelButtonProps={{ size: "large" }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
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

      <Modal
        style={{
          height: "30vh",
        }}
        bodyStyle={{
          textAlign: "center!",
        }}
        centered={true}
        width="50vw"
        title={
          <h1 style={{ textAlign: "center" }}>
            Abonnez vous à notre newsletter
          </h1>
        }
        open={newsletterModalOpen}
        okText="Envoyer"
        cancelText="Annuler"
        onOk={emailForNewsletter ? handleOkNewsletterModal : null}
        okButtonProps={{ size: "large", title: "Envoyer" }}
        cancelButtonProps={{ size: "large", title: "Annuler" }}
        confirmLoading={confirmLoading}
        onCancel={handleCancelNewsletterModal}
      >
        {/* Markdown Editor Editor */}
        <Form layout="vertical" onSubmit={handleOkNewsletterModal}>
          <Form.Item
            // label="Votre Email"
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
              {
                type: "email",
                message: "Veuillez entrer un email valide !",
              },
            ]}
          >
            <Input
              id="newsletterForm"
              type="email"
              placeholder="Veuillez entrer votre email pour poursuivre ..."
              ref={newsletterInputRef}
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
          direction={{ base: "row", md: "row" }}
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
          <Box as="a" href="/" w="100px">
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
                key="S'abonnez à notre newsletter"
                as={ReachLink}
                // to="#"
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  showNewsletterModal();
                }}
              >
                <Heading size="sm" fontWeight="500">
                  <strong>S'abonnez à notre newsletter</strong>
                </Heading>
              </CustomLink>
              <CustomLink
                key="Tableau de bord"
                as={ReachLink}
                to="https://app.possible.africa"
                target="_blank"
              >
                <Heading size="sm" fontWeight="500">
                  <strong>Tableau de bord</strong>
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
                <Heading size="sm" fontWeight="500">
                  <strong>Reporter un bug</strong>
                </Heading>
              </CustomLink>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
