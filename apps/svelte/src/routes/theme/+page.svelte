<script lang="ts">
	import ColorSwatch from '$lib/components/Theme/ColorSwatch.svelte';
</script>

<section class="flex flex-col gap-mq">
	<h2>Theme</h2>
  <div class="contents sm:flex gap-mq *:grow">
    <ColorSwatch theme="dark" />
    <ColorSwatch theme="light" />
  </div>
</section>
