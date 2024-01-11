<script lang="ts">
  import { onMount } from "svelte";
  import { debounceAsync } from "$lib/client/util/utilities.js";
  import desktoplogo from "$lib/assets/logo-d.png";
  import mobilelogo from "$lib/assets/logo-m.png";

  import { MenuBar, MenuBarItem } from "$lib/components/menubar";
  import { Avatar } from "$lib/components/avatar";
  import { Menu, MenuItem } from "$lib/components/menu";
  import GlobalHeader from "$lib/components/globalheader";
  import Badge from "$lib/components/badge";
  import Button from "$lib/components/button";
  import Group from "$lib/components/group";
  import Icon from "$lib/components/icon";
  import { Combobox, Option } from "$lib/components/combobox";
  import { Chip, Chips } from "$lib/components/chip";
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
  import { Dialog, DialogDisclosure, useDialogState } from "$lib/components/dialog";
  import { List, ListItem } from "$lib/components/list";
  import Separator from "$lib/components/separator";
  import { enhance } from "$app/forms";
  import LRUCache from "$lib/client/util/LRUCache";
  export let data;

  let { isMobile } = data;

  interface HistoryItem {
    drawerBackText: string;
    title: string;
    menu: Array<object> | null;
  }

  interface History extends Array<HistoryItem> {}

  function handleMenuBarItemClick(item: HistoryItem) {
    history.push({
      drawerBackText: "All Categories",
      title: item.name,
      menu: item.subnav,
    });

    drawerBackText = "All Categories";
    title = item.name;
    menu = item.subnav;

    $menuDrawerState.showBack = true;
    $menuDrawerState.open = true;
    const drawerMenu = document.querySelector(".drawer .menu");
    drawerMenu.firstElementChild.setAttribute("tabindex", "0");
    drawerMenu.firstElementChild.focus();
  }

  function handleMenuItemClick(item, event) {
    // item.subnav && !item.subnav.length ? null : 
    event.preventDefault();    
    if (item.name === "Categories") {
      $menuDrawerState.showBack = true;
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
      $menuDrawerState.showBack = false;
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
    $menuDrawerState.showBack = false;
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

  async function updateSearchMenu(target) {
    const value = target.value.trim();
		const { products, suggestions, categories } = await customSearch(value);
		const copy = new Map(searchMenu);

    copy.set("recent", value.length ? [] : recent);
    copy.set("products", products.length ? products : []);
    copy.set("suggestions", (suggestions?.keyphrase?.length) ? suggestions.keyphrase.slice(0, 6) : []);
    copy.set("trending", (!value.length && suggestions?.trending_category?.length) ? suggestions.trending_category : []);
    copy.set("categories", categories.length ? categories : []); 

		comboboxRef.resetOptions();
		searchMenu = copy;
  }

	async function handleInput(event) {
		if (event.key == "ArrowDown" || event.key == "ArrowUp" || event.key == "Escape") return;
    console.log(event);
		updateSearchMenu(event.target);
	}

  async function handleFocus({ target }) {
    updateSearchMenu(target);
  }

	const debouncedHandleInput = debounceAsync(handleInput, 250);

	async function jsonpFetch(url: string) {
	  const callbackName = `jsonpCallback_${Date.now()}`;
	
	  const scriptTag = document.createElement('script');
	  scriptTag.src = `${url}&t=${Date.now()}&callback=${callbackName}`;
	
    function cleanup() {
      document.body.removeChild(scriptTag);
      delete window[callbackName];
    }
    
	  const response = await new Promise((resolve, reject) => {
	    window[callbackName] = (data) => {
	      resolve(data);
	      cleanup();
	    };
	
	    scriptTag.addEventListener("error", (error) => {
	      reject(error);
	      cleanup();
	    });
	
	    document.body.appendChild(scriptTag);
	  });
	
	  return response;
	}
	
	function encodeRFK(payload){
	  let data = JSON.stringify(payload);
	  var r, n, i = [], o = [], a = 0, s = 0, c = "1,", f = String.fromCharCode;
	  for (data = function(data) {
      data = data.replace(/\r\n/g, "\n");
      var r, n, i = "", o = String.fromCharCode;
      for (r = 0; r < data.length; r++)
        n = data.charCodeAt(r),
        i += n < 128 ? o(n) : n > 127 && n < 2048 ? o(n >> 6 | 192) + o(63 & n | 128) : o(n >> 12 | 224) + o(n >> 6 & 63 | 128) + o(63 & n | 128);
      return i
	  }(data); a < data.length; ) {
      for (r = 0; r < 3; r++)
        i[r] = data.charCodeAt(a++);
      for (o[0] = i[0] >> 2,
      o[1] = (3 & i[0]) << 4 | i[1] >> 4,
      o[2] = (15 & i[1]) << 2 | i[2] >> 6,
      o[3] = 63 & i[2],
      isNaN(i[1]) ? o[2] = o[3] = 64 : isNaN(i[2]) && (o[3] = 64),
      r = 0; r < 4; r++)
        n = o[r],
        (0,
        c += n < 10 ? f(n + 48) : n < 36 ? f(n + 87) : n < 62 ? f(n + 29) : "-_,".charAt(n - 62))
	  }
	  return c
	}

	function decodeRFK(encodedString) {
	  var r, n, i = {}, o = 0, a = "", s = String.fromCharCode, c = [65, 91], f = [97, 123], u = [48, 58], l = [45, 95, f, u, c], d = 2;
	  for (r in l)
      if (typeof(l[r])=='object')
        for (n = l[r][0]; n < l[r][1]; n++)
          i[s(n)] = o++;
      else
        i[s(l[r])] = o++;
	  for (o = 0,
	  n = d; n < encodedString.length - d; n += 72) {
      var p, g, v = 0, h = 0, m = encodedString.substring(n, n + 72);
      for (p = 0; p < m.length; p++)
        for (v = (v << 6) + i[m.charAt(p)],
          h += 6; h >= 8; )
          (g = (v >>> (h -= 8)) % 256) && (a += s(g))
	  }
	  return JSON.parse(a);
	}
	
	async function customSearch(keyword, numResults = 6, page = 1){
	  let payload = {
			"ckey":"11278-29304574",
			"f":"sb",
			"env":"live",
			"uri": "/",
			"suggestions_filter":{},
			"results_filter":{},
			"sort":[],
			"page":page,
			"np":numResults,
			"facet_list":[],
			"search_keyphrase":keyword,
			"vs":0,
			"frid":1,
			"rfkids":["rfkid_6"],
			"suggestion_list": ["keyphrase", "trending_category", "recent"],
		};
	  let encodedPayload = encodeRFK(payload);
		try {
		  const data = await jsonpFetch(`//prod-east-search-mt.rfksrv.com/rfkj/1/11278-29304574/sp?data=${encodedPayload}`);
			if (typeof(data) === "object") return data;
			else if (typeof(data) === "string" && data.substring(0,2) === "2,") return decodeRFK(data);
		} catch (error) {
	    console.error(error);
	  }
	}

  function handleOptionClick(event) {
    searchQuery = event.currentTarget.dataset.value;
    if (isMobile) {
      $searchDialogState.open = false;
    } else {
      comboboxRef.close();
    }
    console.log("damn")
  }

  function saveSearchHistoryToLocalStorage() {
		const searchHistoryArray = searchHistory.toJSON();
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));
	}

  function clearHistory() {
    searchHistory.clear();
    saveSearchHistoryToLocalStorage();
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
      name: "Find Stores",
      icon: "M20 6H4V4H20V6M14.3 12C13.5 12.96 13 14.18 13 15.5C13 16.64 13.43 17.86 14 19V20H4V14H3V12L4 7H20L20.7 10.5C20.04 10.18 19.32 10 18.56 10L18.36 9H5.64L5.04 12H14.3M12 14H6V18H12V14M22 15.5C22 18.1 18.5 22 18.5 22S15 18.1 15 15.5C15 13.6 16.6 12 18.5 12S22 13.6 22 15.5M19.7 15.6C19.7 15 19.1 14.4 18.5 14.4S17.3 14.9 17.3 15.6C17.3 16.2 17.8 16.8 18.5 16.8S19.8 16.2 19.7 15.6Z",
    },
    {
      component: MenuItem,
      name: "Help",
      icon: "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z",
    },
  ];

  const SEARCH_HISTORY_LIMIT = 5;
	const searchHistory = new LRUCache(SEARCH_HISTORY_LIMIT);

  let comboboxRef;
  let searchQuery: string;
  let drawerBackText = "Main Menu";
  let title = "All Categories";
  const recent = searchHistory.toJSON();
  const searchMap = new Map([
	  ["recent", recent],
	  ["categories", []],
		["suggestions", []],
	  ["trending", []],
    ["products", []],
	]);

	$: searchMenu = searchMap;
  $: menu = mainMenu;

  let history: History = [
    {
      drawerBackText,
      title,
      menu: null,
    },
  ];

  const menuDrawerState = useDrawerState();
  const popoverState = usePopoverState();

  const zipDrawerState = useDrawerState();
  const bopisDrawerState = useDrawerState();
  const searchDialogState = useDialogState();

  onMount(() => {
    let timeout: number;
    window.addEventListener("resize", () => {
      if (timeout) window.cancelAnimationFrame(timeout);
      timeout = window.requestAnimationFrame(() => {
        isMobile = window.matchMedia("(max-width: 560px)").matches;
      });
    });
  });
</script>
<Drawer state={zipDrawerState} alignment="right"></Drawer>
<Drawer state={bopisDrawerState} alignment="right"></Drawer>
<Drawer state={menuDrawerState}>
  <picture class="logo" slot="header">
    <source
      media="(max-width: 560px)"
      width="88"
      height="30"
      srcset={mobilelogo}
    />
    <img
      alt="Spirit Logo"
      class="image"
      width="124"
      height="34"
      decoding="async"
      src={desktoplogo}
    />
  </picture>
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
  {#if $menuDrawerState.showBack}
    <h2 class="drawer__title">{title}</h2>
  {/if}
  <Menu>
    {#each menu as item}
      <svelte:component
        this={item.component ? item.component : MenuItem}
        href={item.subnav && !item.subnav.length ? item.href : null}
        as={"link"}
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
  {#if !data.session}
    <a href="/login?brand=spirit" class="link link--button"> Sign in or Create Account </a>
    <Separator gap={8} />
  {/if}
  <List>
    {#if data.session}
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
  {#if data.session}
    <Separator gap={8} />
    <form use:enhance method="post" action="/logout">
      <Button fullwidth rounded variant="primary" type="submit">Sign out</Button
      >
    </form>
  {/if}
</Popover>
<GlobalHeader
  --desktop-header-template-columns="32px 124px 1fr minmax(auto, max-content)"
  --mobile-header-template-columns="36px 88px 0px 1fr"
>
  <DrawerDisclosure
    state={menuDrawerState}
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
    <picture class="logo">
      <source
        media="(max-width: 560px)"
        width="88"
        height="30"
        srcset={mobilelogo}
      />
      <img
        alt="Spirit Logo"
        class="image"
        decoding="async"
        width="124"
        height="34"
        src={desktoplogo}
      />
    </picture>
  </a>
  <div class="flex-center" style="grid-area:search">
    {#if !isMobile}
      <Combobox bind:value={searchQuery} bind:this={comboboxRef} placeholder="What can we help you find?" on:keydown={debouncedHandleInput} on:focus={handleFocus}>
        {#each searchMenu.entries() as [name, items]}
          {#if items.length}
          <div role="group">
            <div class="combobox__heading" role="presentation">
              {#if name == "trending"}
              <Icon>
                <path fill="#DE5A55" d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"/>
              </Icon>
              {/if}
              {name}
              {#if name === "recent"}
                <Button variant="underline" style="margin-left:auto;text-decoration:underline">
                  Clear
                </Button>
              {/if}
            </div>
            {#if name == "recent" || name == "suggestions" || name == "products"}	
              {#each items as item}
              <Option tag={ name === "recent" ? "div" : "a" } href={name === "recent" ? null : `/spirit/search?q=${name === "suggestions" ? item.text : item.name}`} on:click={handleOptionClick} data-value={name === "suggestions" ? item.text : item.name}>
                {#if name== "recent" || name == "suggestions"}
                <Icon>
                  {#if name == "recent"}
                  <path d="M13.5 8H12v5l4.28 2.54.72-1.21-3.5-2.08V8M13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.896 8.896 0 0 0 13 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9"/>
                  {:else if name == "suggestions"}
                  <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"/>
                  {/if}
                </Icon>
                {/if}
                {#if name== "products"}
                  <img src={item.image_url} alt={`image of ${item.name}`} decoding="async" width="38" height="48" />
                {/if}
                <span>{name === "suggestions" ? item.text : item.name}</span>
                {#if name == "recent"}
                  <Button variant="icon">
                    <Icon>
                      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
                    </Icon>
                  </Button>
                {/if}
              </Option>
              {/each}
            {/if}
            {#if name == "categories" || name == "trending"}
              <Chips style="padding: 0 8px;">
                {#each items as item}
                  <Chip rounded>{item.text}</Chip>
                {/each}
              </Chips>
            {/if}
          </div>
          {/if}
        {/each}
      </Combobox>
    {/if}
  </div>
  <Group align="end">
    {#if isMobile}
      <DialogDisclosure state={searchDialogState} variant="icon" label="Search" stack={Boolean(isMobile)}>
        <Icon>
          <path
            stroke="#000"
            stroke-width="1px"
            d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
          />
        </Icon>
        <!-- <span class="btn-text">Search</span> -->
      </DialogDisclosure>
      <Dialog state={searchDialogState} variant="fullscreen">
        <div role="group" class="dialog__search-heading">
          <Combobox  bind:value={searchQuery} bind:this={comboboxRef} placeholder="What can we help you find?" on:keydown={debouncedHandleInput} on:focus={handleFocus} stayOpen fullwidth>
            {#each searchMenu.entries() as [name, items]}
              {#if items.length}
              <div role="group">
                <div class="combobox__heading" role="presentation">
                  {#if name == "trending"}
                  <Icon>
                    <path fill="#DE5A55" d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"/>
                  </Icon>
                  {/if}
                  {name}
                  {#if name === "recent"}
                    <Button variant="underline" style="margin-left:auto;text-decoration:underline" on:click={clearHistory}>
                      Clear
                    </Button>
                  {/if}
                </div>
                {#if name == "recent" || name == "suggestions" || name == "products"}	
                  {#each items as item}
                  <Option tag={ name === "recent" ? "div" : "a" } href={name === "recent" ? null : `/spirit/search?q=${name === "suggestions" ? item.text : item.name}`} on:click={handleOptionClick} data-value={name === "suggestions" ? item.text : item.name}>
                    {#if name== "recent" || name == "suggestions"}
                    <Icon>
                      {#if name == "recent"}
                      <path d="M13.5 8H12v5l4.28 2.54.72-1.21-3.5-2.08V8M13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.896 8.896 0 0 0 13 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9"/>
                      {:else if name == "suggestions"}
                      <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"/>
                      {/if}
                    </Icon>
                    {/if}
                    {#if name== "products"}
                      <img src={item.image_url} alt={`image of ${item.name}`} decoding="async" width="38" height="48" />
                    {/if}
                    <span>{name === "suggestions" ? item.text : item.name}</span>
                    {#if name == "recent"}
                      <Button variant="icon">
                        <Icon>
                          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
                        </Icon>
                      </Button>
                    {/if}
                  </Option>
                  {/each}
                {/if}
                {#if name == "categories" || name == "trending"}
                  <Chips style="padding: 0 8px;">
                  {#each items as item}
                    <Chip rounded>{item.text}</Chip>
                  {/each}
                  </Chips>
                {/if}
              </div>
              {/if}
            {/each}
          </Combobox>
          <Button aria-label="close" variant="icon" on:click={()=> { $searchDialogState.open = false; }}>
            <Icon>
              <title>close</title>
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </Icon>
          </Button>
        </div>
      </Dialog>
    {/if}
    <Button variant="icon" label="Store locator" stack={Boolean(isMobile)}>
      <Icon>
        <path d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9 2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5Z"/>
      </Icon>
      <!-- <span class="btn-text">Find Store</span> -->
    </Button>
    <PopoverDisclosure label="Account" state={popoverState} stack={Boolean(isMobile)}>
      <Icon>
        <path
          d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2M7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78A7.893 7.893 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.928 7.928 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.5-1.64 4.83M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6m0 5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 8a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 11Z"
        />
      </Icon>
      <div class="desktop-only">
        <div class="subtext">
          {data.session ? `Hi, ${data.session.user.user_metadata.first_name}` : "Sign in"}
        </div>
        <div class="text">Account</div>

      </div>
      <!-- <span class="btn-text">Account</span> -->
    </PopoverDisclosure>
    <Button variant="icon" label="{0} items in cart">
      <Icon>
        <path
          d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2M1 2v2h2l3.6 7.59-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2Z"
        />
      </Icon>
      <Badge>0</Badge>
    </Button>
  </Group>
  <svelte:fragment slot="utility">
    <DrawerDisclosure state={bopisDrawerState} variant="icon" size="small" style="height:24px">
      <Icon>
        <path d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16V4Z"/>
      </Icon>
      <span class="underline-on-hover">Egg Harbor Township</span>
    </DrawerDisclosure>
  </svelte:fragment>
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
  .combobox__heading {
    align-items: center;
    display: flex;
    margin-bottom: 8px;
    padding: 0 8px;
  }

  .dialog__search-heading {
    align-items: center;
    display: flex;
  }

  .logo {
    width: 124px;
  }

  .image {
    width: 100%;
    height: auto;
    display: block;
  }

  .underline-on-hover {
    font-weight: 500;
  }

  .underline-on-hover:hover {
    text-decoration: underline;
  }

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
    .logo {
      width: 88px;
    }

    .desktop-only,
    .theme--spirit {
      display: none;
    }
  }
</style>
