import { createElement } from 'preact';
import Attacher from '../attacher';

export default function createAttacher(context) {
	return props => (
		<Attacher {...props}>{{context}}</Attacher>
	);
}
