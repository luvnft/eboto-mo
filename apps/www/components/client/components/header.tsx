"use client";

import { env } from "@/env.mjs";
import { useStore } from "@/store";
import classes from "@/styles/Header.module.css";
import { useClerk } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Menu,
  Text,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlertCircle,
  IconChartBar,
  IconChevronDown,
  IconLogout,
  IconMoon,
  IconSun,
  IconUserCircle,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function HeaderContent({ user }: { user: User | null }) {
  const { signOut } = useClerk();
  const params = useParams();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { setColorScheme } = useMantineColorScheme();

  const [openedMenu, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const store = useStore();

  return (
    <Container h="100%" size={!params.electionDashboardSlug ? "md" : undefined}>
      <Group h="100%" align="center" justify="space-between" gap="xs">
        <Group h="100%" align="center">
          <UnstyledButton component={Link} href={user ? "/dashboard" : "/"}>
            <Group gap="xs" align="center">
              <Image
                src="/images/logo.png"
                alt="eBoto Mo Logo"
                width={32}
                height={32}
                priority
              />
              <Text fw={600} visibleFrom="xs">
                eBoto Mo
              </Text>
            </Group>
          </UnstyledButton>

          <Center h="100%">
            {params.electionDashboardSlug && (
              <Burger
                opened={store.dashboardMenu}
                onClick={() => store.toggleDashboardMenu()}
                size="sm"
                color="gray.6"
                py="xl"
                hiddenFrom="xs"
                h="100%"
              />
            )}
          </Center>
        </Group>

        {user ? (
          <Menu
            position="bottom-end"
            opened={openedMenu}
            onChange={() => (openedMenu ? closeMenu() : openMenu())}
            withinPortal
            width={200}
          >
            <Menu.Target>
              <UnstyledButton h="100%">
                <Group gap="xs">
                  <Box
                    style={{
                      position: "relative",
                      borderRadius: "50%",
                      overflow: "hidden",
                      width: 24,
                      height: 24,

                      // [theme.fn.largerThan("sm")]: {
                      //   width: 32,
                      //   height: 32,
                      // },
                    }}
                  >
                    <Image
                      src={user.imageUrl}
                      alt="Profile picture"
                      fill
                      sizes="100%"
                      priority
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Box
                    style={{
                      width: 100,
                      // [theme.fn.largerThan("sm")]: {
                      //   width: 140,
                      // },
                    }}
                  >
                    <Text size="xs" truncate fw="bold">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text size="xs" truncate>
                      {user.emailAddresses[0].emailAddress}
                    </Text>
                  </Box>

                  <IconChevronDown
                    size={16}
                    style={{
                      rotate: openedMenu ? "-180deg" : "0deg",
                      transition: "all 0.25s",
                    }}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                href="/dashboard"
                leftSection={<IconChartBar size={16} />}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                component={Link}
                href="/account"
                leftSection={<IconUserCircle size={16} />}
              >
                Account settings
              </Menu.Item>

              <Menu.Item
                leftSection={
                  computedColorScheme === "light" ? (
                    <IconMoon size={16} />
                  ) : (
                    <IconSun size={16} />
                  )
                }
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light",
                  )
                }
                closeMenuOnClick={false}
              >
                {computedColorScheme === "light" ? "Dark mode" : "Light mode"}
              </Menu.Item>
              <Menu.Item
                leftSection={<IconAlertCircle size={16} />}
                // onClick={openReportAProblem}
              >
                Report a problem
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setLogoutLoading(true);
                  void (async () =>
                    await signOut({
                      // callbackUrl: "/signin",
                    }))();
                }}
                closeMenuOnClick={false}
                leftSection={
                  !logoutLoading ? (
                    <IconLogout
                      style={{
                        transform: "translateX(2px)",
                      }}
                      size={16}
                    />
                  ) : undefined
                }
                disabled={logoutLoading}
              >
                {logoutLoading ? (
                  <Center>
                    <Loader size="xs" />
                  </Center>
                ) : (
                  "Log out"
                )}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              size={36}
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light",
                )
              }
            >
              <IconSun size="1rem" className={classes.light} />
              <IconMoon size="1rem" className={classes.dark} />
            </ActionIcon>

            <Button
              hiddenFrom="sm"
              component={Link}
              href={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
            >
              Sign in
            </Button>
            <Button
              variant="outline"
              visibleFrom="sm"
              component={Link}
              href={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
            >
              Sign in
            </Button>

            <Button
              visibleFrom="sm"
              component={Link}
              href={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
            >
              Get Started
            </Button>
          </Group>
        )}
      </Group>
    </Container>
  );
}
