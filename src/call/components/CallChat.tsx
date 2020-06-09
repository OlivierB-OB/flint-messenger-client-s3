import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { makeConversationSeen } from '../../conversations/actions/makeConversationSeen';
import { ChatDisplay } from '../../conversations/components/Chat';

const mapStateToProps = ({ call, conversations }: IAppState) => ({
  isCallChat: true,
  status: conversations.status,
  conversationId: call?.conversationId,
  conversation: conversations.conversations.find(({ _id }) => {
    return _id === call?.conversationId;
  }),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  conversationSeen: (id: string) => void dispatch(makeConversationSeen(id)),
});

export const CallChat = connect(mapStateToProps, mapDispatchToProps)(ChatDisplay);
