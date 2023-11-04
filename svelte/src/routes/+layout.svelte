<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import * as resume from '$lib/assets/resume.json';
	import { onDestroy } from 'svelte'
	import { createMediaStore } from 'svelte-media-queries'
	import { HOME_ROUTE, ROUTES } from "$lib/core/routes";
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import { MEDIA_QUERIES } from "$lib/core";
	import Identity from "$lib/components/Identity.svelte";
	import Print from "$lib/components/Print.svelte";
	const basics = resume.basics;

	const matches = createMediaStore(MEDIA_QUERIES);
	$:splash = $page.url.pathname === HOME_ROUTE.path;
	$:routes = ROUTES.filter(route => route.path !== HOME_ROUTE.path || ($matches ?? {})['md-'] )
	$:showHeader = !!($matches ?? {})['lg+'];
	onDestroy(() => matches.destroy());
</script>

<Layout class="print:hidden" {splash}>
	<Header {basics} slot="header" />
	<slot slot="main" />
	<Footer slot="footer" />
	<Navigation slot="nav" {basics} {routes} {showHeader}>
		<Identity name={basics.name} role={basics.role} location={basics.location} slot="header" />
	</Navigation>
</Layout>
<Print class="hidden print:grid" />
