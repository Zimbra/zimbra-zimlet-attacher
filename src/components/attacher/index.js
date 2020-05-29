import { createElement, Component, render } from 'preact';
import { ActionMenuItem } from '@zimbra-client/components';
import style from './style';

export default class Attacher extends Component {
    constructor(props) {
        super(props);
        this.zimletContext = props.children.context;
        this.props.onAttachmentOptionSelection(this.chooseLinksFromService);
    };

    //onAttachmentOptionSelection is passed from the Zimlet Slot and allows to add an event handler
    onAttachFilesFromService = () =>
        this.props.onAttachmentOptionSelection(this.chooseFilesFromService);

    chooseFilesFromService = (editor) => {
       this.downloadAndAttachFile("/skins/_base/logos/AppBanner.png", editor);
    }

    downloadAndAttachFile = (path, editor) => {
        var request = new XMLHttpRequest();
        request.open('GET', path);
        request.responseType = "blob";
        request.onreadystatechange = function (e) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // Blob and File are defined per window; We need compatibility with the parent Blob for attachments
                    let file = new window.parent.File([request.response], "Zimbra.png", { type: request.response.type });
                    editor.addAttachments([file], false);
                } else {
                    alert('whoops some error occurred');
                }
            }
        }.bind(this);
        request.send();    
    }

    render() {
        const childIcon = (
            <span class={style.appIcon}>
            </span>);

        return (
            <ActionMenuItem icon={childIcon} onClick={this.onAttachFilesFromService}>Attach Zimlet Test</ActionMenuItem>
        );
    }
}
