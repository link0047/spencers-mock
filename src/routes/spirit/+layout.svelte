<script lang="ts">
  import { MenuBar, MenuBarItem } from "$lib/components/menubar";
  import Avatar from "$lib/components/avatar";
  import { Menu, MenuItem } from "$lib/components/menu";
  import GlobalHeader from "$lib/components/globalheader";
  import Badge from "$lib/components/badge";
  import Button from "$lib/components/button";
  import Group from "$lib/components/group";
  import Icon from "$lib/components/icon";
  import { useComboBoxState, Combobox } from "$lib/components/combobox";
  import {
    Drawer,
    DrawerDisclosure,
    useDrawerState,
  } from "$lib/components/drawer";
  import {
    Popover,
    PopoverDisclosure,
    usePopoverState,
  } from "$lib/components/popover";
  import { List, ListItem } from "$lib/components/list";
  import Separator from "$lib/components/separator";
  import { enhance } from "$app/forms";
  export let data;

  interface HistoryItem {
    drawerBackText: string;
    title: string;
    menu: Array<object> | null;
  }

  interface History extends Array<HistoryItem> {}

  function handleMenuBarItemClick(item) {
    history.push({
      drawerBackText: "All Categories",
      title: item.name,
      menu: item.subnav,
    });

    drawerBackText = "All Categories";
    title = item.name;
    menu = item.subnav;

    $drawerState.showBack = true;
    $drawerState.open = true;
    const drawerMenu = document.querySelector(".drawer .menu");
    drawerMenu.firstElementChild.setAttribute("tabindex", 0);
    drawerMenu.firstElementChild.focus();
  }

  function handleMenuItemClick(item) {
    if (item.name === "Categories") {
      $drawerState.showBack = true;
      menu = item.subnav;
      return;
    }

    history.push({
      drawerBackText: title,
      title: item.name,
      menu: item.subnav,
    });

    drawerBackText = title;
    title = item.name;
    menu = item.subnav;
  }

  function backToPrevMenu() {
    if (history.length === 1) {
      $drawerState.showBack = false;
      menu = mainMenu;
      return;
    }

    history.pop();
    const _data = history[history.length - 1];
    drawerBackText = _data.drawerBackText;
    title = _data.title;
    menu = _data.menu !== null ? _data.menu : data.categories;
  }

  function backToMainMenu(): void {
    $drawerState.showBack = false;
    menu = mainMenu;
    title = "All Categories";
    drawerBackText = "Main Menu";
    history = [
      {
        drawerBackText,
        title,
        menu: null,
      },
    ];
  }

  const mainMenu = [
    {
      component: MenuItem,
      name: "Categories",
      icon: "M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 10C13.1 10 14 10.9 14 12S13.1 14 12 14 10 13.1 10 12 10.9 10 12 10M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z",
      subnav: data.categories,
    },
    {
      component: Separator,
    },
    {
      component: MenuItem,
      name: "My Account",
      icon: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z",
    },
    {
      component: MenuItem,
      name: "Order Status",
      icon: "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z",
    },
    {
      component: Separator,
    },
    {
      component: MenuItem,
      name: "Live Chat",
      icon: "M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2M12.19,5.5C11.3,5.5 10.59,5.68 10.05,6.04C9.5,6.4 9.22,7 9.27,7.69H11.24C11.24,7.41 11.34,7.2 11.5,7.06C11.7,6.92 11.92,6.85 12.19,6.85C12.5,6.85 12.77,6.93 12.95,7.11C13.13,7.28 13.22,7.5 13.22,7.8C13.22,8.08 13.14,8.33 13,8.54C12.83,8.76 12.62,8.94 12.36,9.08C11.84,9.4 11.5,9.68 11.29,9.92C11.1,10.16 11,10.5 11,11H13C13,10.72 13.05,10.5 13.14,10.32C13.23,10.15 13.4,10 13.66,9.85C14.12,9.64 14.5,9.36 14.79,9C15.08,8.63 15.23,8.24 15.23,7.8C15.23,7.1 14.96,6.54 14.42,6.12C13.88,5.71 13.13,5.5 12.19,5.5M11,12V14H13V12H11Z",
    },
    {
      component: MenuItem,
      name: "The Inspo Spot",
      icon: "M19 5V19H5V5H19M21 3H3V21H21V3M17 17H7V16H17V17M17 15H7V14H17V15M17 12H7V7H17V12Z",
    },
    {
      component: MenuItem,
      name: "Fid Stores",
      icon: "M20 6H4V4H20V6M14.3 12C13.5 12.96 13 14.18 13 15.5C13 16.64 13.43 17.86 14 19V20H4V14H3V12L4 7H20L20.7 10.5C20.04 10.18 19.32 10 18.56 10L18.36 9H5.64L5.04 12H14.3M12 14H6V18H12V14M22 15.5C22 18.1 18.5 22 18.5 22S15 18.1 15 15.5C15 13.6 16.6 12 18.5 12S22 13.6 22 15.5M19.7 15.6C19.7 15 19.1 14.4 18.5 14.4S17.3 14.9 17.3 15.6C17.3 16.2 17.8 16.8 18.5 16.8S19.8 16.2 19.7 15.6Z",
    },
    {
      component: MenuItem,
      name: "Help",
      icon: "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z",
    },
  ];

  let drawerBackText = "Main Menu";
  let title = "All Categories";
  $: menu = mainMenu;

  let history: History = [
    {
      drawerBackText,
      title,
      menu: null,
    },
  ];

  const searchState = useComboBoxState();
  const drawerState = useDrawerState();
  const popoverState = usePopoverState();
</script>

<Drawer state={drawerState}>
  <Icon variant="logo" viewbox="0 0 72 32" slot="header">
    <path
      d="M10.9 12.6c-.8-.5-1.8-.8-2.7-1-.8-.2-1.6-.2-2.3-.5-.6-.3-1-.7-1-1.6v-.2c.1-.8.7-1.1 1.6-1.1s2.1.3 3 .8c1 .5 1.8 1.1 1.9 1.4 0 .1.1.1.1.1l.1-.1c0-.5-.2-2.6-.3-2.9v-.1h-.1c-.4.1-.7.3-1.1.3h-.2c-.7 0-1.4-.2-2.1-.4-1.2-.4-2.3-.6-3.5-.6-.2 0-.5 0-.7.1-.5.1-1 .3-1.4.6C1.3 8 .9 8.9.9 9.9c0 1.1.5 2.3 1.5 3 .6.4 1.2.7 1.9.8.9.3 2 .3 2.9.5 1 .2 1.7.6 1.7 1.6 0 1.3-1.1 2.2-2.4 2.3h-.2c-.6 0-1.3-.1-1.8-.2-.7-.1-1.1-.2-1.6-.4-.2-.1-.9-.9-.9-1.1 0 0 0-.1-.1-.1h-.1c-.3.3-1.3 2.5-1.6 3v.1h.2c.5-.3 1.2-.6 1.7-.6h.1c.6 0 2.6.2 4.5.2.5 0 1 0 1.4-.1.9-.1 1.9-.5 2.5-1 .9-.7 1.7-2 1.7-3.3 0-.3 0-.6-.1-.8-.2-.4-.7-.9-1.3-1.2m24.5 8.1v-.1c-.5-.4-1.2-.5-1.6-.8-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6v-8c0-.2.2-.4.5-.6.3-.2.6-.4.7-.4.5-.3 1.1-.3 1.6-.8v-.1c0-.2-.1-.2-.1-.2h-8.2s-.1 0-.1.1v.1c.5.4 1.2.5 1.6.8.1 0 .4.2.7.4.3.2.5.5.5.6v8c0 .2-.2.4-.5.6s-.6.4-.7.4c-.5.3-1.1.3-1.6.8v.1l.1.1H35.4m20.5-9.3c.3-.2.6-.4.7-.4.5-.2 1.1-.3 1.6-.7V10H50s-.1 0-.1.1v.1c.5.4 1.2.5 1.6.7.1 0 .4.2.7.4.3.2.5.5.5.6v7.6c0 .2-.2.4-.5.6-.3.2-.6.4-.7.4-.5.2-1.1.3-1.6.7v.1l.1.1h8.2s.1 0 .1-.1v-.1c-.5-.4-1.2-.5-1.6-.7-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6v-7.6c-.1 0 .1-.3.4-.5m15.9-3.7L70 5.2s-.1-.1-.2 0c0 0-.1 0-.3.1-.7.2-2.2.7-5.3.7-2.1 0-3.5-.2-4.4-.4-.4-.1-.7-.2-.9-.3-.2-.1-.3-.1-.3-.1h-.2l-1.6 2.5v.1s.1.1.1 0c0 0 1.1-.4 1.7-.5.7-.1 1.3-.1 1.8-.1 1.2 0 1.8.2 2.1.5.4.3.4.6.4.7v7.5c0 .2-.2.4-.5.6s-.6.4-.7.4c-.5.3-1.1.3-1.6.8v.1l.1.1h8.2s.1 0 .1-.1v-.1c-.5-.4-1.2-.5-1.6-.8-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6V8.4c0-.2 0-.4.3-.7.3-.2.9-.5 2.1-.5.5 0 1.1 0 1.8.1.6.1 1.7.5 1.7.5h.1c.1 0 .1 0 .1-.1m-45.1 6c-.3-.4-.8-.5-1.2-.7-.9-.3-2.5-.4-3.8-.4h-8.1s-.1 0-.1.1v.1c.4.4 1.5.9 2 1.1.2.1.5.3.5.4v8c0 .1-.4.3-.9.6s-1.1.5-1.7.8l-.1.1c0 .1.1.1.1.1h8.1v-.2c-.1 0-.2-.1-.5-.2-.4-.2-.9-.5-1.4-.7l-.6-.3c-.1 0-.1-.1-.2-.1v-8c0-.2.1-.4.2-.6.3-.3.7-.3 1.2-.4h.6c.6 0 1.3.1 1.8.4.5.3 1 .8 1.1 1.4v.4c0 .3 0 .5-.1.8-.4 1.3-1.7 1.5-3.1 1.7h-1.3c-.1 0-.1 0-.1.1s0 .1.1.1c1 .6 2.5.8 3.4.8h.3c.8 0 1.7-.3 2-.3.6-.2 1-.5 1.5-.8.6-.5.9-1.4.9-2.2.1-.9-.1-1.6-.6-2.1M56 24.5c-3.5 0-6.2-.6-9-2l-.1.1.1-.1c-1-.5-2.2-1.2-2.9-2.2h.7c.8 0 1.8-.3 2-.3.6-.2 1.1-.5 1.5-.9.6-.5 1-1.4 1-2.3 0-.7-.2-1.5-.7-2-.3-.4-.8-.6-1.3-.7-.9-.3-2.6-.4-4-.4h-8.5s-.1 0-.1.1v.1c.5.5 1.5.9 2.1 1.2.2.1.5.3.5.4v8.4c0 .1-.4.4-.9.6-.5.3-1.1.6-1.8.9l-.1.1c0 .1.1.1.1.1h8.5v-.2c-.1 0-.2-.1-.5-.2l-1.4-.7c-.2-.1-.4-.3-.6-.4-.1 0-.1-.1-.2-.1v-3.4h.5c1.4.1 2.1 1.6 3.3 2.6 2.1 2 5 3.3 8.1 3.3.3 0 1 0 1.5-.3.6-.2 1.1-.5 1.3-.7.2-.2.6-.5.6-.5v-.1c.4-.4.3-.4.3-.4m-10.2-8c0 .3 0 .6-.1.8-.4 1.3-1.7 1.6-3.2 1.7h-.3c-.5 0-1.3 0-1.6-.1V15.1c0-.3.1-.4.2-.6.3-.3.8-.3 1.2-.4h.7c.6 0 1.3.1 1.8.4.6.3 1 .8 1.1 1.4.2.3.2.5.2.6M22.2 7.8l-1.7-.3.4-.8-.7.5-.4-1.7-.4 1.7-.8-.4.4.7-1.7.4 1.7.4-.4.8.7-.5.4 1.7.4-1.7.9.4-.5-.7 1.7-.5zM8.4 22.5l-1.8-.3.5-.8-.7.5-.5-1.7-.4 1.8-.8-.5.5.7-1.7.4 1.8.4-.5.8.7-.5.5 1.9.3-1.8.8.4-.5-.8 1.8-.5zm21.9 1.9-1.7-.4.4-.7-.7.4-.4-1.7-.4 1.8-.8-.5.5.7-1.7.4 1.7.5-.4.7.7-.5.4 1.8.4-1.8.8.5-.5-.7 1.7-.5zm36.1-2.8-1.8-.4.5-.7-.8.4-.4-1.7-.5 1.8-.8-.5.5.7-1.7.5 1.8.4-.5.7.7-.4.5 1.7.3-1.8.8.5-.5-.7 1.9-.5zM45 8.5l-1.8-.3.5-.8-.7.5-.4-1.8-.4 1.8-.8-.4.5.7-1.9.4 1.9.4-.5.8.7-.5.5 1.7.4-1.8.7.5-.4-.7 1.7-.5z"
    />
  </Icon>
  <div slot="back" class="back__group">
    <Button
      variant="underline"
      label="Back to {drawerBackText}"
      on:click={backToPrevMenu}
    >
      <Icon>
        <title>arrow-left</title>
        <path
          d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
        />
      </Icon>
      Back to {drawerBackText}
    </Button>
    {#if drawerBackText != "Main Menu"}
      <Button
        variant="underline"
        label="Main Menu"
        on:click={backToMainMenu}
        style="color:#2a508f;text-decoration:underline"
      >
        Main Menu
      </Button>
    {/if}
  </div>
  {#if $drawerState.showBack}
    <h2 class="drawer__title">{title}</h2>
  {/if}
  <Menu>
    {#each menu as item}
      <svelte:component
        this={item.component ? item.component : MenuItem}
        href={item.subnav && !item.subnav.length ? item.href : null}
        as={item.subnav && !item.subnav.length ? "link" : null}
        on:click={item.subnav && item.subnav.length
          ? handleMenuItemClick.bind(null, item)
          : null}
      >
        {#if item.icon}
          <Icon>
            <path d={item.icon} />
          </Icon>
        {/if}
        {#if item.img && !item.img.includes("data:image/png;base64")}
          <div style="padding:4px 0">
            <Avatar size="lg" src={item.img} rounded ring />
          </div>
        {/if}
        {#if item.subnav?.length && item.name !== "Categories" && item.img.includes("data:image/png;base64")}
          <span />
        {/if}
        {item.name}
        {#if item.subnav?.length && item.name !== "Categories"}
          <Icon>
            <title>chevron-right</title>
            <path
              d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
            />
          </Icon>
        {/if}
      </svelte:component>
    {/each}
  </Menu>
</Drawer>
<Popover state={popoverState}>
  {#if !data.user}
    <a href="/login" class="link link--button"> Sign in or Create Account </a>
    <Separator gap={8} />
  {/if}
  <List>
    {#if data.user}
      <ListItem>
        <a href="/account" class="list__item-link">
          <Icon>
            <title>account-circle-outline</title>
            <path
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"
            />
          </Icon>
          My Account
        </a>
      </ListItem>
    {/if}
    <ListItem variant="iconWithText">
      <Icon>
        <title>package-variant-closed</title>
        <path
          d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z"
        />
      </Icon>
      Order Status
    </ListItem>
  </List>
  {#if data.user}
    <Separator gap={8} />
    <form use:enhance method="post" action="/logout">
      <Button fullwidth rounded variant="primary" type="submit">Sign out</Button
      >
    </form>
  {/if}
</Popover>
<GlobalHeader>
  <DrawerDisclosure
    state={drawerState}
    style="grid-area:menu;max-width:36px"
    label="Main Menu"
  >
    <Icon>
      <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
    </Icon>
  </DrawerDisclosure>
  <a
    href="/spirit"
    title="Spirit Halloween"
    class="link"
    style="grid-area:logo"
  >
    <Icon variant="logo" viewbox="0 0 72 32">
      <path
        d="M10.9 12.6c-.8-.5-1.8-.8-2.7-1-.8-.2-1.6-.2-2.3-.5-.6-.3-1-.7-1-1.6v-.2c.1-.8.7-1.1 1.6-1.1s2.1.3 3 .8c1 .5 1.8 1.1 1.9 1.4 0 .1.1.1.1.1l.1-.1c0-.5-.2-2.6-.3-2.9v-.1h-.1c-.4.1-.7.3-1.1.3h-.2c-.7 0-1.4-.2-2.1-.4-1.2-.4-2.3-.6-3.5-.6-.2 0-.5 0-.7.1-.5.1-1 .3-1.4.6C1.3 8 .9 8.9.9 9.9c0 1.1.5 2.3 1.5 3 .6.4 1.2.7 1.9.8.9.3 2 .3 2.9.5 1 .2 1.7.6 1.7 1.6 0 1.3-1.1 2.2-2.4 2.3h-.2c-.6 0-1.3-.1-1.8-.2-.7-.1-1.1-.2-1.6-.4-.2-.1-.9-.9-.9-1.1 0 0 0-.1-.1-.1h-.1c-.3.3-1.3 2.5-1.6 3v.1h.2c.5-.3 1.2-.6 1.7-.6h.1c.6 0 2.6.2 4.5.2.5 0 1 0 1.4-.1.9-.1 1.9-.5 2.5-1 .9-.7 1.7-2 1.7-3.3 0-.3 0-.6-.1-.8-.2-.4-.7-.9-1.3-1.2m24.5 8.1v-.1c-.5-.4-1.2-.5-1.6-.8-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6v-8c0-.2.2-.4.5-.6.3-.2.6-.4.7-.4.5-.3 1.1-.3 1.6-.8v-.1c0-.2-.1-.2-.1-.2h-8.2s-.1 0-.1.1v.1c.5.4 1.2.5 1.6.8.1 0 .4.2.7.4.3.2.5.5.5.6v8c0 .2-.2.4-.5.6s-.6.4-.7.4c-.5.3-1.1.3-1.6.8v.1l.1.1H35.4m20.5-9.3c.3-.2.6-.4.7-.4.5-.2 1.1-.3 1.6-.7V10H50s-.1 0-.1.1v.1c.5.4 1.2.5 1.6.7.1 0 .4.2.7.4.3.2.5.5.5.6v7.6c0 .2-.2.4-.5.6-.3.2-.6.4-.7.4-.5.2-1.1.3-1.6.7v.1l.1.1h8.2s.1 0 .1-.1v-.1c-.5-.4-1.2-.5-1.6-.7-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6v-7.6c-.1 0 .1-.3.4-.5m15.9-3.7L70 5.2s-.1-.1-.2 0c0 0-.1 0-.3.1-.7.2-2.2.7-5.3.7-2.1 0-3.5-.2-4.4-.4-.4-.1-.7-.2-.9-.3-.2-.1-.3-.1-.3-.1h-.2l-1.6 2.5v.1s.1.1.1 0c0 0 1.1-.4 1.7-.5.7-.1 1.3-.1 1.8-.1 1.2 0 1.8.2 2.1.5.4.3.4.6.4.7v7.5c0 .2-.2.4-.5.6s-.6.4-.7.4c-.5.3-1.1.3-1.6.8v.1l.1.1h8.2s.1 0 .1-.1v-.1c-.5-.4-1.2-.5-1.6-.8-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6V8.4c0-.2 0-.4.3-.7.3-.2.9-.5 2.1-.5.5 0 1.1 0 1.8.1.6.1 1.7.5 1.7.5h.1c.1 0 .1 0 .1-.1m-45.1 6c-.3-.4-.8-.5-1.2-.7-.9-.3-2.5-.4-3.8-.4h-8.1s-.1 0-.1.1v.1c.4.4 1.5.9 2 1.1.2.1.5.3.5.4v8c0 .1-.4.3-.9.6s-1.1.5-1.7.8l-.1.1c0 .1.1.1.1.1h8.1v-.2c-.1 0-.2-.1-.5-.2-.4-.2-.9-.5-1.4-.7l-.6-.3c-.1 0-.1-.1-.2-.1v-8c0-.2.1-.4.2-.6.3-.3.7-.3 1.2-.4h.6c.6 0 1.3.1 1.8.4.5.3 1 .8 1.1 1.4v.4c0 .3 0 .5-.1.8-.4 1.3-1.7 1.5-3.1 1.7h-1.3c-.1 0-.1 0-.1.1s0 .1.1.1c1 .6 2.5.8 3.4.8h.3c.8 0 1.7-.3 2-.3.6-.2 1-.5 1.5-.8.6-.5.9-1.4.9-2.2.1-.9-.1-1.6-.6-2.1M56 24.5c-3.5 0-6.2-.6-9-2l-.1.1.1-.1c-1-.5-2.2-1.2-2.9-2.2h.7c.8 0 1.8-.3 2-.3.6-.2 1.1-.5 1.5-.9.6-.5 1-1.4 1-2.3 0-.7-.2-1.5-.7-2-.3-.4-.8-.6-1.3-.7-.9-.3-2.6-.4-4-.4h-8.5s-.1 0-.1.1v.1c.5.5 1.5.9 2.1 1.2.2.1.5.3.5.4v8.4c0 .1-.4.4-.9.6-.5.3-1.1.6-1.8.9l-.1.1c0 .1.1.1.1.1h8.5v-.2c-.1 0-.2-.1-.5-.2l-1.4-.7c-.2-.1-.4-.3-.6-.4-.1 0-.1-.1-.2-.1v-3.4h.5c1.4.1 2.1 1.6 3.3 2.6 2.1 2 5 3.3 8.1 3.3.3 0 1 0 1.5-.3.6-.2 1.1-.5 1.3-.7.2-.2.6-.5.6-.5v-.1c.4-.4.3-.4.3-.4m-10.2-8c0 .3 0 .6-.1.8-.4 1.3-1.7 1.6-3.2 1.7h-.3c-.5 0-1.3 0-1.6-.1V15.1c0-.3.1-.4.2-.6.3-.3.8-.3 1.2-.4h.7c.6 0 1.3.1 1.8.4.6.3 1 .8 1.1 1.4.2.3.2.5.2.6M22.2 7.8l-1.7-.3.4-.8-.7.5-.4-1.7-.4 1.7-.8-.4.4.7-1.7.4 1.7.4-.4.8.7-.5.4 1.7.4-1.7.9.4-.5-.7 1.7-.5zM8.4 22.5l-1.8-.3.5-.8-.7.5-.5-1.7-.4 1.8-.8-.5.5.7-1.7.4 1.8.4-.5.8.7-.5.5 1.9.3-1.8.8.4-.5-.8 1.8-.5zm21.9 1.9-1.7-.4.4-.7-.7.4-.4-1.7-.4 1.8-.8-.5.5.7-1.7.4 1.7.5-.4.7.7-.5.4 1.8.4-1.8.8.5-.5-.7 1.7-.5zm36.1-2.8-1.8-.4.5-.7-.8.4-.4-1.7-.5 1.8-.8-.5.5.7-1.7.5 1.8.4-.5.7.7-.4.5 1.7.3-1.8.8.5-.5-.7 1.9-.5zM45 8.5l-1.8-.3.5-.8-.7.5-.4-1.8-.4 1.8-.8-.4.5.7-1.9.4 1.9.4-.5.8.7-.5.5 1.7.4-1.8.7.5-.4-.7 1.7-.5z"
      />
    </Icon>
  </a>
  <div class="flex-center" style="grid-area:search">
    <Combobox
      placeholder="Search"
      rounded
      state={searchState}
      style="max-width:640px"
    />
  </div>
  <Group align="end">
    <PopoverDisclosure state={popoverState}>
      <Icon>
        <path
          d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2M7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78A7.893 7.893 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.928 7.928 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.5-1.64 4.83M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6m0 5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 8a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 11Z"
        />
      </Icon>
      <div class="desktop-only">
        <div class="subtext">
          {data.user ? `Hi, ${data.user.name.split(" ")[0]}` : "Sign in"}
        </div>
        <div class="text">Account</div>
      </div>
    </PopoverDisclosure>
    <Button variant="icon">
      <Icon>
        <path
          d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2M1 2v2h2l3.6 7.59-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2Z"
        />
      </Icon>
      <Badge>0</Badge>
    </Button>
  </Group>
</GlobalHeader>
<nav class="theme--spirit">
  <MenuBar label="Featured Categories">
    {#each data.categories as item}
      <MenuBarItem
        as="link"
        href={item.href}
        hasPopup={item.subnav.length ? true : null}
        open={item.subnav.length ? false : null}
        on:click={handleMenuBarItemClick.bind(null, item)}
      >
        {item.name}
      </MenuBarItem>
    {/each}
  </MenuBar>
</nav>
<main class="page-container">
  <slot />
</main>

<style>
  .theme--spirit :global(.menubar) {
    background-color: #000;
  }

  .theme--spirit :global(.menubar .menubar__item) {
    color: #fff;
  }

  .theme--spirit :global(.menubar__item):hover:before,
  .theme--spirit :global(.focus .menubar__item):before {
    background-color: #fdefea;
  }

  .theme--spirit :global(.menubar__item):hover,
  .theme--spirit :global(.menubar__item):active,
  .theme--spirit :global(.focus .menubar__item[tabindex="0"]) {
    text-decoration: underline;
    color: #f16531;
  }

  .back__group {
    display: flex;
    align-items: center;
    height: 32px;
    width: 100%;
    padding-right: 8px;
    flex: 0 0 100%;
    justify-content: space-between;
  }

  .list__item-link,
  .list__item-link:visited {
    display: grid;
    gap: 8px;
    grid-template-columns: 24px 1fr;
    text-decoration: none;
    color: #212121;
  }

  .desktop-navmenu {
    position: relative;
    border-bottom: 1px solid #d1d1d6;
    padding: 4px;
  }

  .drawer__title {
    margin: 8px;
    line-height: 1.2;
    font-size: 20px;
    font-weight: 500;
  }

  .drawer__item {
    width: 100%;
    background-color: transparent;
    border: none;
    display: grid;
    grid-template-columns: 60px 1fr 24px;
    gap: 8px;
    text-align: left;
    align-items: center;
    height: 72px;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .drawer__item--no-image {
    grid-template-columns: 1fr 24px;
    height: 40px;
    padding: 0 8px;
  }

  .link {
    display: inline-flex;
    justify-content: center;
  }

  .link--button {
    -webkit-tap-highlight-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 64px;
    height: 36px;
    border: none;
    outline: 0;
    overflow: hidden;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none;
    appearance: none;
    gap: 4px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #2a508f;
    color: #fff;
    box-shadow: inset 0 0 0 2px #1d3864;
    border-radius: 18px;
    padding: 0 16px;
  }

  .subtext,
  .text {
    text-align: left;
    line-height: 1.1;
  }

  .subtext {
    font-size: 12px;
  }

  .text {
    font-weight: 500;
    font-size: 16px;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .desktop-only {
    display: block;
  }

  @media (max-width: 560px) {
    .desktop-only,
    .theme--spirit {
      display: none;
    }
  }
</style>
