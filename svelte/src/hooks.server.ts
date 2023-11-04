export async function handle({ event, resolve }) {
	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			const theme = event.cookies.get('theme');

			if (theme) {
				return html.replace(`data-theme=""`, `data-theme="${theme}"`);
			} else {
				return html;
			}
		}
	});
}
