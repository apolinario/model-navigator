<script>
	import { onMount } from "svelte";

	let models = [];
	let cursor = null;

	onMount(async () => {
		await loadModels();
	});

	async function loadModels() {
		let url =
			"https://huggingface.co/api/models?filter=diffusers&sort=likesRecent&direction=-1&full=1&limit=25";
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
	}
	function getImageUrl(id, siblings) {
		let image = siblings.find((sibling) => {
			let extension = sibling.rfilename.split(".").pop().toLowerCase();
			return ["jpg", "jpeg", "png", "webp"].includes(extension);
		});
		console.log(image);
		return image
			? "https://huggingface.co/" +
					id +
					"/resolve/main/" +
					image.rfilename
			: "https://picsum.photos/300/300";
	}
</script>

<h2>Most liked models last month 🤗</h2>
<div class="grid">
	{#each models as model}
		<div class="grid-item">
			<h3><a href="https://huggingface.co/{model.id}">{model.id}</a></h3>
			<img
				width="300"
				src={getImageUrl(model.id, model.siblings)}
				alt="example"
			/>
			<p>Likes: {model.likesRecent}</p>
		</div>
	{/each}
</div>

<button type="button" on:click={loadModels}>Load more</button>

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
