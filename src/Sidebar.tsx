import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { VscRepo } from "react-icons/vsc";

import ConnectionStatus from "./ConnectionStatus";
import User from "./User";
import languages from "./languages.json";
import type { UserInfo } from "./rustpad";

export type SidebarProps = {
  documentId: string;
  connection: "connected" | "disconnected" | "desynchronized";
  darkMode: boolean;
  language: string;
  currentUser: UserInfo;
  users: Record<number, UserInfo>;
  onDarkModeChange: () => void;
  onLanguageChange: (language: string) => void;
  onLoadSample: () => void;
  onChangeName: (name: string) => void;
  onChangeColor: () => void;
};

function Sidebar({
  documentId,
  connection,
  darkMode,
  language,
  currentUser,
  users,
  onDarkModeChange,
  onLanguageChange,
  onLoadSample,
  onChangeName,
  onChangeColor,
}: SidebarProps) {
  const toast = useToast();

  // For sharing the document by link to others.
  const documentUrl = `${window.location.origin}/#${documentId}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(documentUrl);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Container
      w={{ base: "3xs", md: "2xs", lg: "xs" }}
      display={{ base: "none", sm: "block" }}
      bgColor={darkMode ? "#252526" : "#f3f3f3"}
      overflowY="auto"
      maxW="full"
      lineHeight={1.4}
      py={4}
    >
      <ConnectionStatus darkMode={darkMode} connection={connection} />

      <Flex justifyContent="space-between" mt={4} mb={1.5} w="full">
        <Heading size="sm">Dark Mode</Heading>
        <Switch isChecked={darkMode} onChange={onDarkModeChange} />
      </Flex>

      <Heading mt={4} mb={1.5} size="sm">
        Language
      </Heading>
      <Select
        size="sm"
        bgColor={darkMode ? "#3c3c3c" : "white"}
        borderColor={darkMode ? "#3c3c3c" : "white"}
        value={language}
        onChange={(event) => onLanguageChange(event.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang} style={{ color: "black" }}>
            {lang}
          </option>
        ))}
      </Select>

      <Heading mt={4} mb={1.5} size="sm">
        Share Link
      </Heading>
      <InputGroup size="sm">
        <Input
          readOnly
          pr="3.5rem"
          variant="outline"
          bgColor={darkMode ? "#3c3c3c" : "white"}
          borderColor={darkMode ? "#3c3c3c" : "white"}
          value={documentUrl}
        />
        <InputRightElement width="3.5rem">
          <Button
            h="1.4rem"
            size="xs"
            onClick={handleCopy}
            _hover={{ bg: darkMode ? "#575759" : "gray.200" }}
            bgColor={darkMode ? "#575759" : "gray.200"}
            color={darkMode ? "white" : "inherit"}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>

      <Heading mt={4} mb={1.5} size="sm">
        Active Users
      </Heading>
      <Stack spacing={0} mb={1.5} fontSize="sm">
        <User
          info={currentUser}
          isMe
          onChangeName={onChangeName}
          onChangeColor={onChangeColor}
          darkMode={darkMode}
        />
        {Object.entries(users).map(([id, info]) => (
          <User key={id} info={info} darkMode={darkMode} />
        ))}
      </Stack>

      <Heading mt={4} mb={1.5} size="sm">
        Sobre
      </Heading>
      <Text fontSize="sm" mb={1.5}>
        <strong>Rustpad</strong> é um editor de texto colaborativo de código aberto,
        baseado no algoritmo de <em>transformação operacional</em>
        e modificado para facilitar <strong>as aulas de MQA</strong>.
      </Text>
      <Text fontSize="sm" mb={1.5}>
        Compartilhe um link deste documento com outras pessoas e elas poderão editar
        a partir do navegador, vendo suas alterações em tempo real.
      </Text>
      <Text fontSize="sm" mb={1.5}>
        Desenvolvido em Rust e TypeScript. Veja o{" "}
        <Link
          color="blue.600"
          fontWeight="semibold"
          href="https://github.com/im-alexandre/rustpad"
          isExternal
        >
          repositório no GitHub
        </Link>{" "}
        para mais detalhes.
      </Text>
      <Text fontSize="sm" mb={1.5}>
        Este projeto é um fork de{" "}
        <Link
          color="blue.600"
          fontWeight="semibold"
          href="https://github.com/ekzhang/rustpad"
          isExternal
        >
          github.com/ekzhang/rustpad
        </Link>.
      </Text>
    </Container>
  );
}

export default Sidebar;
