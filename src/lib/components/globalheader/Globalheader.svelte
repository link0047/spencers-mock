<script>
  import Icon from "$lib/components/icon";
  import Button from "$lib/components/button";
</script>

<header class="global-header">
  <nav class="global-header__nav">
    <div class="global-header__container">
      <slot />
    </div>
    <!-- <div class="global-header__utility-container">
      <Button variant="icon" size="small" style="height:24px">
        <Icon>
          <path d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16V4Z"/>
        </Icon>
        <span class="ellipsis">Egg Harbor Township</span>
      </Button>
      <Button variant="icon" size="small" style="height:24px">
        <Icon>
          <path d="M19.8 9.7c-.1-.1-.2-.1-.2-.1h-1.1c-.2 0-.3.1-.3.3v1.6c0 .2.1.3.3.3H21c.2 0 .3-.1.3-.3 0-.1 0-.1-.1-.2l-1.4-1.6z" />
          <path d="M20.6 8.4c-.2-.2-.4-.3-.7-.3h-2.2v-.9c0-.5-.4-.9-.9-.9H7.6c-.5 0-.9.4-.9.9v8.1c0 .5.4.9.9.9h1.1c.2 1.1 1.3 1.7 2.3 1.5.7-.2 1.3-.7 1.5-1.5h4.4c.1 0 .2 0 .3-.1.1 0 .2.1.3.1h.6c.2.9 1 1.5 1.9 1.5h.2c.8-.1 1.5-.7 1.7-1.5h.6c.5 0 .9-.4.9-.9v-3.5l-2.8-3.4zm1.8 3.8v2.9h-.5c-.4-1-1.5-1.5-2.5-1.1-.5.2-.9.6-1.1 1.1h-.5V9.2h2.1l2.5 3zm-2.9 3c.2-.2.4-.2.6-.2.5 0 .8.4.8.8 0 .5-.4.8-.8.8s-.8-.4-.8-.8c-.1-.2 0-.4.2-.6m-2.8-7.8v7.7h-4.2c-.4-1-1.5-1.5-2.5-1.1-.5.2-.9.6-1.1 1.1h-1V7.4h8.8zm-6.1 7.5c.5 0 .8.4.8.8 0 .5-.4.8-.8.8s-.8-.4-.8-.8.4-.8.8-.8" />
          <path d="M5.6 11H1.9c-.2 0-.5-.2-.5-.5s.2-.5.5-.5h3.7c.2 0 .5.2.5.5-.1.3-.3.5-.5.5"/>
          <path d="M4.8 12.8H1c-.2 0-.5-.2-.5-.5s.2-.5.5-.5h3.8c.2 0 .5.2.5.5s-.2.5-.5.5"/>
        </Icon>
        <span class="ellipsis">Pleasantville, NJ 08232</span>
      </Button>
    </div> -->
  </nav>
</header>

<style>
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
  }

  .global-header {
    width: 100%;
    position: relative;
    min-height: 52px;
    box-sizing: border-box;
  }

  .global-header__nav {
    display: grid;
    gap: 4px;
    background-color: #fff;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d1d1d6;
  }

  .global-header__container {
    position: relative;
    display: grid;
    grid-template-areas: "menu logo search group";
    grid-template-columns: 32px 72px 1fr minmax(auto, max-content);
    gap: 8px;
    align-items: center;
    width: 100vw;
    height: 52px;
    max-width: 1256px;
  }

  .global-header__utility-container {
    display: none;
    /* display: grid; */
    grid-template-columns: repeat(auto-fit, minmax(64px, max-content));
    gap: 16px;
    align-items: center;
    min-height: 32px;
    padding: 0 8px;
    width: 100vw;
    max-width: 1256px;
  }

  @media (max-width: 560px) {
    .global-header__nav {
      position: fixed;
      z-index: 9;
    }

    .global-header__container {
      padding: 8px;
      grid-template-areas: "menu logo search group";
      grid-template-columns: 36px 40px 1fr 64px;
    }
  }
</style>
