import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { IAxiosMock, mockAxios, getDeffered, sleep, IHistoryMock, mockHistory } from '../../utils/__mocks__';
import { makeSubmitRegistrationForm } from '../actions/makeSubmitRegistrationForm';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeSubmitRegistrationForm', () => {
  let axiosMock: IAxiosMock;
  let historyMock: IHistoryMock;
  let spyInitialize: jest.Mock;
  let restoreInitialize: () => void;

  beforeEach(() => {
    axiosMock = mockAxios();
    historyMock = mockHistory();
    [spyInitialize, restoreInitialize] = makeInitializeApplication.mock(jest.fn());
  });

  afterEach(() => {
    axiosMock.restore();
    historyMock.restore();
    restoreInitialize();
  });

  it('should submit the registration then start the application and redirect to the profile', async () => {
    const [postRegister, resolvePostRegister] = await getDeffered();

    const store = mockStore({
      profileForm: {
        fields: {
          email: {
            value: 'foo@test.com',
            isValid: true,
          },
          firstName: {
            value: 'foo',
            isValid: true,
          },
          lastName: {
            value: 'bar',
            isValid: true,
          },
          password: {
            value: 'aB1/aB1/',
            isValid: true,
          },
          confirmation: {
            value: 'aB1/aB1/',
            isValid: true,
          },
        },
      },
    });

    axiosMock.post.mockReturnValueOnce(postRegister);
    store.dispatch(makeSubmitRegistrationForm() as any);

    expect(axiosMock.post).toHaveBeenCalledWith(
      `${api_backend_url}/register`,
      {
        email: 'foo@test.com',
        firstName: 'foo',
        lastName: 'bar',
        password: 'aB1/aB1/',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
      {
        type: 'VALIDATE_PROFILE_FORM_CONTENT',
      },
    ]);
    store.clearActions();

    resolvePostRegister({ data: 'new updated profile' });

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        type: 'CALL_RESET',
      },
      {
        type: 'CONVERSATIONS_RESET',
      },
      {
        type: 'IDENTITY_RESET',
      },
      {
        type: 'LAYOUT_RESET',
      },
      {
        type: 'LOGIN_RESET',
      },
      {
        type: 'PROFILE_FORM_RESET',
      },
      {
        type: 'REALTIME_RESET',
      },
      {
        type: 'USERS_RESET',
      },
    ]);
    store.clearActions();

    expect(spyInitialize).toHaveBeenCalledWith('new updated profile');
    expect(historyMock.push).toHaveBeenCalledWith('/profile');
  });

  it('should set the status in error if unable to submit the registration', async () => {
    const [postRegister, , rejectPostRegister] = await getDeffered();

    const store = mockStore({
      profileForm: {
        fields: {
          email: {
            value: 'foo@test.com',
            isValid: true,
          },
          firstName: {
            value: 'foo',
            isValid: true,
          },
          lastName: {
            value: 'bar',
            isValid: true,
          },
          password: {
            value: 'aB1/aB1/',
            isValid: true,
          },
          confirmation: {
            value: 'aB1/aB1/',
            isValid: true,
          },
        },
      },
    });

    axiosMock.post.mockReturnValueOnce(postRegister);
    store.dispatch(makeSubmitRegistrationForm() as any);

    expect(axiosMock.post).toHaveBeenCalledWith(
      `${api_backend_url}/register`,
      {
        email: 'foo@test.com',
        firstName: 'foo',
        lastName: 'bar',
        password: 'aB1/aB1/',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
      {
        type: 'VALIDATE_PROFILE_FORM_CONTENT',
      },
    ]);
    store.clearActions();

    rejectPostRegister(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'error',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();

    expect(spyInitialize).not.toHaveBeenCalled();
    expect(historyMock.push).not.toHaveBeenCalled();
  });
});
