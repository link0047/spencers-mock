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
      <slot name="utility" />
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
