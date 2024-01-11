<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  export let data;
  const { query } = data;

  $: products = [];
  
  $: q = $page.url.searchParams.get("q");

  /**
   * Makes a JSONP fetch request to the specified URL.
   *
   * @param {string} url - The URL to fetch using JSONP.
   * @returns {Promise} - A promise that resolves with the fetched data.
   */
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
	
  /**
   * Encodes an object using the RFK encoding algorithm.
   *
   * @param {Object} payload - The object to encode.
   * @returns {string} - The encoded string.
   */
	function encodeRFK(payload: object) {
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

  /**
   * Decodes an RFK encoded string to retrieve the original object.
   *
   * @param {string} encodedString - The RFK encoded string.
   * @returns {Object} - The decoded object.
   */
	function decodeRFK(encodedString: string) {
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

  async function customSearch(keyword: string | null, numResults = 24, page = 1){
	  let payload = {
			"ckey": "11278-269126707",
			"f": "sp",
			"env": "live",
			"uri": "/",
			"suggestions_filter": {},
			"results_filter": {},
			"sort": [],
			"page": page,
			"np": numResults,
			"facet_list": [],
			"search_keyphrase": keyword,
			"vs": 0,
			"frid": 1,
			"rfkids": ["rfkid_6"],
			"suggestion_list": ["keyphrase", "trending_category"],
		};
	  let encodedPayload = encodeRFK(payload);
		try {
		  const data = await jsonpFetch(`//prod-east-search-mt.rfksrv.com/rfkj/1/11278-269126707/sp?data=${encodedPayload}`);
			if (typeof(data) === "object") return data;
			else if (typeof(data) === "string" && data.substring(0,2) === "2,") return decodeRFK(data);
		} catch (error) {
	    console.error(error);
	  }
	}

  $: {
    if (browser) {
      handleSearch(q);
    }
  }

  async function handleSearch(query: string | null) {
    const data = await customSearch(query);
    products = data.products;
    console.log(query);
  }

  onMount(async () => {
    const data = await customSearch(query);
    products = data.products;
    console.log(data)
  });
</script>
<svelte:head>
  <title>Search</title>
</svelte:head>
<h2 class="search__heading">Results for "{q}"</h2>
<div class="search-grid">
  {#each products as { image_url, name, price, final_price, review_rating }, i}
    <div class="card">
      <img width="217" height="272" class="image" src={image_url} alt={`Image of ${name}`} decoding="async" loading={i < 6 ? null : "lazy"} />
      <div class="product__name">{name}</div>
    </div>
  {/each}
</div>

<style>
.search__heading {
  padding: 8px 8px 0;
  font-size: 1.25rem;
}

.image {
  width: 100%;
  height: auto;
  display: block;
}

.search-grid {
  display: grid;
  column-gap: 16px;
  row-gap: 48px;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px;
}

@media (max-width: 560px) {
  .search-grid {
    column-gap: 8px;
    grid-template-columns: repeat(2, 1fr);
  }
}

.product__name {
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0 0;
  line-height: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;
}
</style>