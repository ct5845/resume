<script lang="ts">
	import Icon from '@iconify/svelte';

	let splash: boolean;
	let className: string;

	$: sideDrawerLargeClass = splash ? 'lg:hidden' : '';
	$: contentClass = splash ? '' : '';
	$: footerClass = splash ? '' : 'lg:col-start-2 lg:col-span-1';
	const sideNavToggleId = 'side-nav-open';

	export { splash, className as class };
</script>

<div
	class="drawer grid min-h-screen grid-cols-2 grid-rows-[auto_1fr_auto] gap-1 md:min-h-fit md:grid-cols-[1fr_auto_auto_1fr] md:grid-rows-[auto_auto_auto] {className}">
	<input id={sideNavToggleId} type="checkbox" class="drawer-toggle lg:hidden" />
	<header class="sticky top-0 col-span-2 flex items-center p-2 backdrop-blur-sm md:col-span-4">
		<label
			for={sideNavToggleId}
			aria-label="open sidebar"
			class="btn btn-circle btn-ghost lg:hidden">
			<Icon class="text-lg" icon="material-symbols:menu" />
		</label>
		<slot name="header" />
	</header>
	<nav
		class="relative z-10 overflow-auto max-lg:drawer-side lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:w-96 {sideDrawerLargeClass}">
		<label for={sideNavToggleId} aria-label="close sidebar" class="drawer-overlay"></label>
		<div
			class="h-full overflow-y-auto bg-base-200/80 p-2 backdrop-blur lg:fixed lg:top-16 lg:w-96 lg:bg-base-100">
			<slot name="nav" />
		</div>
	</nav>
	<main
		class="col-span-2 px-2 md:col-start-2 md:w-prose lg:col-span-1 lg:col-start-3 {contentClass}">
		<slot name="main" />
	</main>
	<footer
		class="sticky bottom-0 col-span-2 flex flex-row items-center p-2 backdrop-blur-sm md:col-start-2 lg:col-span-1 lg:col-start-3 {footerClass}">
		<slot name="footer" />
	</footer>
</div>
