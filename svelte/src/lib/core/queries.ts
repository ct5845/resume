const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536
};

const minWidth = (breakpoint: number) => `min-width: ${breakpoint}px`;
const maxWidth = (breakpoint: number) => `max-width: ${breakpoint}px`;

export const MEDIA_QUERIES = {
	'sm+': `(${minWidth(breakpoints.sm)})`,
	'md+': `(${minWidth(breakpoints.md)})`,
	'lg+': `(${minWidth(breakpoints.lg)})`,
	'xl+': `(${minWidth(breakpoints.xl)})`,
	'2xl+': `(${minWidth(breakpoints['2xl'])})`,
	'sm-': `(${maxWidth(breakpoints.md - 1)})`,
	'md-': `(${maxWidth(breakpoints.lg - 1)})`,
	'lg-': `(${maxWidth(breakpoints.xl - 1)})`,
	'xl-': `(${maxWidth(breakpoints['2xl'] - 1)})`,
	print: `print`,
	screen: `screen`
};
