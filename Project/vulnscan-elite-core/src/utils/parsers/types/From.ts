import { Param } from "./Param";

export type Form = {
	url: string;
	action: string;
	method: string;
	parameters: Param[];
};
