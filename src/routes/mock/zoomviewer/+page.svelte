<script lang="ts">
  import Page from "$lib/components/page/Page.svelte";
  import ProductGallery from "$lib/components/productGallery/ProductGallery.svelte";
  const product = new Map<string, string | number | Array<string | number>>([
    ["name", "Pink Gloomy Bear Hoodie"],
    ["price", [54.99, 59.99]],
    ["color", "Pink"],
    ["size", ["small", "medium", "large", "XL"]]
  ]);

  let price = product.get("price") as Array<number>;
  const images = [{
		src: {
      desktop: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--IpxXvxyE--/c_scale,w_640/v1709237144/jx6nbjhprv6pduzvzedb.webp",
      mobile: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--b7FnYPyM--/c_scale,w_320/v1709237144/jx6nbjhprv6pduzvzedb.webp"
    },
		thumbnail: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--nTMya-gn--/c_scale,w_60/v1709237144/jx6nbjhprv6pduzvzedb.webp",
		detailedSrc: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--5JvW6DEy--/v1709237144/jx6nbjhprv6pduzvzedb.webp",
    alt: "Front View of Pink Gloomy Bear Hoodie"
	},{
		src: {
      desktop: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--QJ1U01I7--/c_scale,h_640/v1709237142/cs9wnfguogzx48wsgnqh.webp",
      mobile: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--DgmzEDXo--/c_scale,w_320/v1709237142/cs9wnfguogzx48wsgnqh.webp"
    },
		thumbnail: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--2go8J7O_--/c_scale,h_60,w_60/v1709237142/cs9wnfguogzx48wsgnqh.webp",
		detailedSrc: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--qA93iX2F--/c_scale,h_2000/v1709237142/cs9wnfguogzx48wsgnqh.webp",
    alt: "Back View of Pink Gloomy Bear Hoodie"
	}, {
		src: {
      desktop: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--gQA7zTKW--/c_scale,h_640/v1709237145/ui91s88zyfrwg6cbxfdy.webp",
      mobile: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--Fei-sa9A--/c_scale,w_320/v1709237145/ui91s88zyfrwg6cbxfdy.webp"
    },
		thumbnail: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--VX72t8q2--/c_scale,h_60/v1709237145/ui91s88zyfrwg6cbxfdy.webp",
		detailedSrc: "https://res.cloudinary.com/dle2ecsgk/image/upload/s--tX3fShB6--/v1709237145/ui91s88zyfrwg6cbxfdy.webp",
    alt: "Detail of Sleeve on Pink Gloomy Bear Hoodie"
	}];

  export let data;
  let { isMobile } = data;
</script>

<Page>
  <ProductGallery {images} {isMobile}/>
</Page>

<style>

</style>