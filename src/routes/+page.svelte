<script>
	import { onMount } from "svelte";

	let models = [];
	let cursor = null;
	let loading = false;

	onMount(async () => {
		await loadModels();
		await getImageUrl();
	});

	async function loadModels() {
		if (loading) return;
		loading = true;
		let url =
			"https://huggingface.co/api/models?filter=diffusers&sort=likesRecent&direction=-1&full=1&limit=24";
		if (cursor) {
			url += `&cursor=${cursor}`;
		}
		const res = await fetch(url);
		const linkHeader = res.headers.get("link");
		if (linkHeader) {
			const linkHeaders = linkHeader.split(",");
			linkHeaders.forEach((header) => {
				const match = header.match(/<(.+)>;\srel="next"/);
				if (match) {
					cursor = match[1].split("&cursor=")[1];
				}
			});
		}
		models = [...models, ...(await res.json())];
		loading = false;
	}
	async function getImageUrl(id, siblings) {
		//Tries to get the first image avaliable in the repo
		let image = siblings.find((sibling) => {
			let extension = sibling.rfilename.split(".").pop().toLowerCase();
			return ["jpg", "jpeg", "png", "webp"].includes(extension);
		});

		const baseUrl = "https://huggingface.co/" + id;

		if (image) {
			return `${baseUrl}/resolve/main/${image.rfilename}`;
		} else {
			//If no image is avaliable in the repo, tries to get the first URL to an image avaliable in the README.md
			const regex =
				/\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*\.(?:jpe?g|png|gif|bmp|webp)\b/gi;
			const res = await fetch(`${baseUrl}/resolve/main/README.md`);
			const readmeContent = await res.text();
			const matches = readmeContent.match(regex);

			return matches ? matches[0] : "https://placehold.co/300x300";
		}
	}
	function handleScroll() {
		const scrollTop =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;
		const scrollHeight = document.body.scrollHeight;
		const clientHeight =
			document.documentElement.clientHeight || window.innerHeight;
		if (scrollTop + clientHeight >= scrollHeight - 1) {
			loadModels();
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />
<h2>Most liked models last month 🤗</h2>
<p>Diffusers models most liked on Hugging Face last month</p>
<div class="grid">
	{#each models as model}
		<div class="grid-item">
			<h3>
				<a
					href="https://huggingface.co/{model.id}"
					target="_blank"
					rel="noreferrer">{model.id}</a
				>
			</h3>
			{#await getImageUrl(model.id, model.siblings)}
				<p>loading...</p>
			{:then model_image}
				<img width="300" src={model_image} alt="example" />
			{:catch error}
				<img
					width="300"
					src="https://placehold.co/300x300"
					alt="example"
				/>
			{/await}
			<p>Likes: {model.likesRecent}</p>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 20px;
	}

	.grid-item {
		background-color: lightgray;
		padding: 20px;
	}
</style>
