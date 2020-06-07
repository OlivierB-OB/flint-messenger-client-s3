import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { shallow } from 'enzyme';
import { ContactList } from '../MyContacts';

describe('ContactList', () => {
  it('should appear as loading if users service is unavailable', async () => {
    const list: any = [];
    function createConversation() {}
    const component = shallow(
      <ContactList status="unavailable" list={list} createConversation={createConversation} />,
    ).dive();
    expect(component).toMatchSnapshot();
  });

  it('should display a message if no contact', async () => {
    const list: any = [];
    function createConversation() {}
    const component = shallow(
      <ContactList status="ready" list={list} createConversation={createConversation} />,
    ).dive();
    expect(component).toMatchSnapshot();
  });

  it('should display the contact', async () => {
    const list: any = [
      {
        _id: '123',
      },
      {
        _id: '124',
      },
    ];
    function createConversation() {}
    const component = shallow(
      <ContactList status="ready" list={list} createConversation={createConversation} />,
    ).dive();
    expect(component).toMatchSnapshot();
  });

  it('should allow selecting a contact to create a new conversation', async () => {
    const list: any = [
      {
        _id: '123',
      },
      {
        _id: '124',
      },
    ];
    const createConversation = jest.fn();
    const component = shallow(
      <ContactList status="ready" list={list} createConversation={createConversation} />,
    ).dive();
    component.find(ListItem).at(0).simulate('click');
    expect(createConversation).toHaveBeenCalledWith('123');
  });
});
