/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import 'jsdom-global/register';
import chai, { expect } from 'chai';
import React from 'react';
import chaiJestSnapshot from 'chai-jest-snapshot';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';
import NewTodoForm from '../NewTodoForm';

chai.use(chaiJestSnapshot);

configure({
  adapter: new Adapter(),
});

before(() => {
  chaiJestSnapshot.resetSnapshotRegistry();
});

// eslint-disable-next-line func-names
beforeEach(function () {
  chaiJestSnapshot.configureUsingMochaContext(this);
});

describe('NewTodoForm', () => {
  it('renders correctly', () => {
    const component = renderer.create(<NewTodoForm />);
    const tree = component.toJSON();

    expect(tree).to.matchSnapshot();
  });

  it('has input with placeholder and button', () => {
    const mockOnCreateNewTodoCallBack = sinon.stub();
    const mockTodos = [{
      id: 1,
      text: 'go to the park',
      isCompleted: true,
    }];
    const wrapper = mount(<NewTodoForm
      onCreateNewTodoClicked={mockOnCreateNewTodoCallBack}
      todos={mockTodos}
    />);
    expect(wrapper.find('button').at(0).text().includes('Craft Todo')).to.equal(true);
    expect(wrapper.find('input').at(0).props().placeholder).to.equal('Type new todo item here');
  });

  it('invokes a callback with value if text is not duplicated', () => {
    const mockOnCreateNewTodoCallBack = sinon.stub();
    const mockTodos = [{
      id: 1,
      text: 'Go to the park',
      isCompleted: true,
    }];
    const wrapper = mount(<NewTodoForm
      onCreateNewTodoClicked={mockOnCreateNewTodoCallBack}
      todos={mockTodos}
    />);
    wrapper.find('input').simulate('change', { target: { value: 'Read a book' } });
    expect(wrapper.find('input').instance().value).to.equal('Read a book');

    wrapper.find('button').at(0).simulate('click');
    expect(mockOnCreateNewTodoCallBack.calledOnce).to.equal(true);
    expect(mockOnCreateNewTodoCallBack.calledWith('Read a book')).to.equal(true);

    expect(wrapper.find('input').instance().value).to.equal('');
  });

  it('does not invoke a callback if text is duplicated', () => {
    const mockOnCreateNewTodoCallBack = sinon.stub();
    const mockTodos = [{
      id: 1,
      text: 'Go to the park',
      isCompleted: true,
    }];
    const wrapper = mount(<NewTodoForm
      onCreateNewTodoClicked={mockOnCreateNewTodoCallBack}
      todos={mockTodos}
    />);
    wrapper.find('input').simulate('change', { target: { value: 'Go to the park' } });
    expect(wrapper.find('input').instance().value).to.equal('Go to the park');

    wrapper.find('button').at(0).simulate('click');
    expect(mockOnCreateNewTodoCallBack.calledOnce).to.equal(false);

    expect(wrapper.find('input').instance().value).to.equal('Go to the park');
  });
});
