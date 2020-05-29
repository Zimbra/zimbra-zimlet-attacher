//Load components from Zimbra
import { createElement } from "preact";

//Load the createMore function from our Zimlet component
import createAttacher from "./components/create-attacher";


export default function Zimlet(context) {
	//Get the 'plugins' object from context and define it in the current scope
	const { plugins } = context;
	const exports = {};

	exports.init = function init() {
		const attacher = createAttacher(context);
		plugins.register('slot::compose-attachment-action-menu', attacher);
	};

	return exports;
}
