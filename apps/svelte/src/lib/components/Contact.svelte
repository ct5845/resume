<script>
	import CopyLink from './CopyLink.svelte';

  const textSize = 'text-sm print:!text-xs';
  const linkClass = `flex items-center ${textSize}  gap-1`;
</script>

<ul aria-label="Contact Information" class="not-prose inline-grid grid-cols-2 items-center sm:flex sm:justify-between sm:gap-1">
	<li class="truncate {textSize}" aria-label="Location">Bristol, United Kingdom</li>
	<li class={linkClass} aria-label="Email">
		<CopyLink href="mailto:ct5845@gmail.com">ct5845@gmail.com</CopyLink>
	</li>
	<li class={linkClass} aria-label="GitHub">
		<CopyLink href="https://github.com/ct5845">github.com/ct5845</CopyLink>
	</li>
	<li class={linkClass} aria-label="LinkedIn">
		<CopyLink href="https://linkedin.com/in/ct5845">linkedin.com/in/ct5845</CopyLink>
	</li>
</ul>