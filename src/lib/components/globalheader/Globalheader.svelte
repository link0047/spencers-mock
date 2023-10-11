<script>
  import Icon from "$lib/components/icon";
  import Button from "$lib/components/button";
</script>

<header class="global-header">
  <nav class="global-header__nav">
    <div class="global-header__container">
      <slot />
    </div>
  </nav>
  <div class="global-header-utility">
    <div class="global-header-utility__container">
      <Button variant="icon" size="small" style="height:24px">
        <Icon>
          <path d="M12 11.5A2.5 2.5 0 0 1 9.5 9 2.5 2.5 0 0 1 12 6.5 2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/>
        </Icon>
        <span class="ellipsis">08232</span>
      </Button>
      <Button variant="icon" size="small" style="height:24px">
        <Icon>
          <path d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16V4Z"/>
        </Icon>
        <span class="ellipsis">Egg Harbor Township</span>
      </Button>
    </div>
  </div>
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
    position: sticky;
    top: 0;
    z-index: 9;
    min-height: 52px;
    box-sizing: border-box;
    border-bottom: 1px solid #d1d1d6;
    background-color: #fff;
  }

  .global-header__nav {
    display: grid;
    gap: 4px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .global-header__container {
    position: relative;
    display: grid;
    grid-template-areas: "menu logo search group";
    grid-template-columns: var(
      --desktop-header-template-columns,
      32px 72px 1fr minmax(auto, max-content)
    );
    padding-inline: 4px;
    gap: 8px;
    align-items: center;
    width: 100vw;
    height: 52px;
    max-width: 1256px;
  }

  .global-header-utility {
    border-top: 1px solid #d1d1d6;
    padding: 0 8px;
    display: flex;
    justify-content: center;
    width: 100vw;
  }

  .global-header-utility__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(64px, max-content));
    gap: 16px;
    min-height: 32px;
    align-items: center;
    width: 100vw;
    max-width: 1256px;
  }

  @media (max-width: 560px) {
    .global-header__container {
      padding: 8px;
      grid-template-areas: "menu logo search group";
      grid-template-columns: var(
        --mobile-header-template-columns,
        36px 40px 1fr 64px
      );
    }
  }

  @media (min-width: 1256px) {
    .global-header__container {
      padding-inline: 0;
    }
  }
</style>
