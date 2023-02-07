export interface IRoute {
	routeID: number;
	pid: number;
	path: string;
	name: string;
	pname: string;
	link?: string;
	title: string;
	icon: string;
	children?: IRoute[];
}
