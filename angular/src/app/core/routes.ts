export interface Route {
	path: string;
	name: string;
	icon?: string;
	iconClass?: string;
}

export const HOME_ROUTE = {
	path: '',
	name: 'Home',
	icon: 'favicon'
};

export const WORK_ROUTE = {
	path: 'work',
	name: 'Work Experience',
	iconClass: 'mask mask-hexagon'
};

export const EDUCATION_ROUTE = {
	path: 'education',
	name: 'Education',
	iconClass: 'mask mask-parallelogram'
};

export const SKILLS_ROUTE = {
	path: 'skills',
	name: 'Skills',
	iconClass: 'mask mask-star'
};

export const INTERESTS_ROUTE = {
	path: 'interests',
	name: 'Interests',
	iconClass: 'mask mask-pentagon'
};

export const ROUTES: Route[] = [
	HOME_ROUTE,
	WORK_ROUTE,
	EDUCATION_ROUTE,
	SKILLS_ROUTE,
	INTERESTS_ROUTE
];

export const ROUTES_NO_HOME = ROUTES.filter((route) => route.path !== HOME_ROUTE.path);
