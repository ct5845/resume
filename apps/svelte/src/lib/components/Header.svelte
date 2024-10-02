<script>
	import Contact from './Contact.svelte';
</script>

<header
	class="py-mq sticky top-0 bg-base-100 border-b-2 print:relative print:border-black print:mb-2"
>
	<div class="flex items-start justify-between">
		<h1>Christopher Turner</h1>
		<a
			href="./resume.pdf"
			aria-label="Download Christopher Turner's Resume as a PDF"
			class="btn gap-4 btn-primary btn-md print:hidden"
		>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-current"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
			<span>PDF</span></a
		>
	</div>
	<Contact />
</header>
