"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ActionIcon,
  Anchor,
  Container,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

export default function Footer() {
  const params = useParams();
  return (
    <Container h="100%" fluid={!!params?.electionDashboardSlug}>
      <Group justify="space-between" w="100%" gap={0} h="100%">
        <UnstyledButton component={Link} href="/">
          <Group gap={4}>
            <Image
              src="/images/logo.png"
              alt="eBoto Mo Logo"
              width={32}
              height={32}
              priority
            />
            <Text fw={600}>eBoto Mo</Text>
          </Group>
        </UnstyledButton>

        <Group gap="xs">
          <Anchor size="sm" component={Link} href="/privacy">
            Privacy Policy
          </Anchor>
          <Anchor size="sm" component={Link} href="/terms">
            Terms & Conditions
          </Anchor>
          <Anchor size="sm" component={Link} href="/cookie">
            Cookie Policy
          </Anchor>
          <ActionIcon
            variant="subtle"
            component={Link}
            href="https://www.facebook.com/cvsueboto/"
            target="_blank"
            size="lg"
          >
            <IconBrandFacebook size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            component={Link}
            href="https://twitter.com/cvsueboto"
            target="_blank"
            size="lg"
            visibleFrom="xs"
          >
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            component={Link}
            href="https://www.youtube.com/@eboto-mo"
            target="_blank"
            size="lg"
          >
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            component={Link}
            href="https://github.com/bricesuazo/eboto-mo"
            target="_blank"
            size="lg"
            visibleFrom="sm"
          >
            <IconBrandGithub size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
}
