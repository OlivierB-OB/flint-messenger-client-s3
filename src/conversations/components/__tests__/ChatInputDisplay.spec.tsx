import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { ChatInputDisplay } from '../ChatInput';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ChatInputDisplay', () => {
  it('should display the chat input form', async () => {
    const props: any = {
      conversationId: '123',
      messageEdition: 'message edition',
      updateMessageEdition: jest.fn(),
      sendMessage: jest.fn(),
    };
    const component = shallow(<ChatInputDisplay {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should allow editing the message', async () => {
    const props: any = {
      conversationId: '123',
      messageEdition: 'message edition',
      updateMessageEdition: jest.fn(),
      sendMessage: jest.fn(),
    };
    const component = shallow(<ChatInputDisplay {...props} />);
    component.find(TextField).simulate('change', { target: { value: 'new message value' } });
    expect(props.updateMessageEdition).toHaveBeenCalledWith('new message value');
  });

  it('should allow sending the message', async () => {
    const props: any = {
      conversationId: '123',
      messageEdition: 'message edition',
      updateMessageEdition: jest.fn(),
      sendMessage: jest.fn(),
    };
    const component = shallow(<ChatInputDisplay {...props} />);
    expect(component.find(Fab).at(0).prop('type')).toEqual('submit');
    component.find('form').simulate('submit', { preventDefault: () => null });
    expect(props.sendMessage).toHaveBeenCalledWith('123');
  });

  it('should reset the message edition when loaded', async () => {
    const props: any = {
      conversationId: '123',
      messageEdition: 'message edition',
      updateMessageEdition: jest.fn(),
      sendMessage: jest.fn(),
    };
    const store = mockStore({
      call: {},
    });
    mount(
      <Provider store={store}>
        <ChatInputDisplay {...props} />
      </Provider>,
    );
    expect(props.updateMessageEdition).toHaveBeenCalledWith('');
  });
});
