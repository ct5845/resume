<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import Interests from "$lib/components/content/Interests.svelte";
</script>

<Content>
	<span slot="header">Interests</span>
	<Interests slot="content" />
</Content>
