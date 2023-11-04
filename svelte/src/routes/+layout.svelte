<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import * as resume from '$lib/assets/resume.json';
	import { ROUTES as routes } from '$lib/core/routes';
	import Navigation from '$lib/components/Navigation.svelte';
	const basics = resume.basics;

	const splash = false;
</script>

<Layout class="print:hidden" {splash}>
	<Header {basics} slot="header" />
	<slot slot="main" />
	<Footer slot="footer" />
	<Navigation slot="nav" {basics} {routes} />
</Layout>
