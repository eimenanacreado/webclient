var React = require("react");
var ReactDOM = require("react-dom");
var utils = require('./../../../ui/utils.jsx');
var MegaRenderMixin = require('./../../../stores/mixins.js').MegaRenderMixin;
var ContactsUI = require('./../contacts.jsx');
var ConversationMessageMixin = require('./mixin.jsx').ConversationMessageMixin;
var getMessageString = require('./utils.jsx').getMessageString;

var ChatHandleMessage = React.createClass({
    mixins: [ConversationMessageMixin],

    render: function () {
        var self = this;
        var cssClasses = "message body";

        var message = this.props.message;
        var megaChat = this.props.message.chatRoom.megaChat;
        var chatRoom = this.props.message.chatRoom;
        var contact = self.getContact();
        var timestampInt = self.getTimestamp();
        var timestamp = self.getTimestampAsString();
        var name = "";


        var datetime = <div className="message date-time"
                                       title={time2date(timestampInt)}>{timestamp}</div>;

        var displayName;
        if (contact) {
            displayName = generateAvatarMeta(contact.u).fullName;
        }
        else {
            displayName = contact;
        }

        var avatar = null;
        if (this.props.grouped) {
            cssClasses += " grouped";
        }
        else {
            avatar = <ContactsUI.Avatar contact={contact} className="message  avatar-wrapper small-rounded-avatar"/>;
            datetime = <div className="message date-time"
                            title={time2date(timestampInt)}>{timestamp}</div>;
            name = <div className="message user-card-name">{displayName}</div>;
        }


        return (
            <div className={cssClasses} data-id={"id" + message.messageId} key={message.messageId}>
                {avatar}

                <div className="message content-area small-info-txt">
                    <div className="message user-card-name">{displayName}</div>
                    {datetime}

                    <div className="message text-block">
                        {(message.meta.handleUpdate === 1) ? l[20570] : l[20571]}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = {
    ChatHandleMessage
};
