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
import { TodoList } from '../TodoList';
import TodoListItem from '../TodoListItem';
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

describe('TodoList', () => {
  it('renders correctly', () => {
    const mockOnLoadTodos = sinon.stub();
    const mockIncompletedTodos = [{
      id: 1,
      text: 'Go to the cinema',
      isCompleted: false,
    },
    {
      id: 2,
      text: 'Go to the theater',
      isCompleted: false,
    }];
    const mockCompletedTodos = [{
      id: 3,
      text: 'Go to the skating ring',
      isCompleted: true,
    },
    {
      id: 4,
      text: 'Meet with friends',
      isCompleted: true,
    }];
    const component = renderer.create(<TodoList
      incompletedTodos={mockIncompletedTodos}
      completedTodos={mockCompletedTodos}
      onLoadTodos={mockOnLoadTodos}
    />);
    const tree = component.toJSON();

    expect(tree).to.matchSnapshot();
  });

  it('has form, headings and 2 set of items', () => {
    const mockOnRemoveTodoCallBack = sinon.stub();
    const mockOnCompleteTodoCallBack = sinon.stub();
    const mockOnCreateNewTodoCallBack = sinon.stub();
    const mockOnLoadTodos = sinon.stub();
    const mockIncompletedTodos = [{
      id: 1,
      text: 'Go to the cinema',
      isCompleted: false,
    },
    {
      id: 2,
      text: 'Go to the theater',
      isCompleted: false,
    }];
    const mockCompletedTodos = [{
      id: 3,
      text: 'Go to the skating ring',
      isCompleted: true,
    },
    {
      id: 4,
      text: 'Meet with friends',
      isCompleted: true,
    }];
    const wrapper = mount(<TodoList
      onCreateNewTodoClicked={mockOnCreateNewTodoCallBack}
      onRemoveTodoClicked={mockOnRemoveTodoCallBack}
      onCompleteTodoClicked={mockOnCompleteTodoCallBack}
      incompletedTodos={mockIncompletedTodos}
      completedTodos={mockCompletedTodos}
      onLoadTodos={mockOnLoadTodos}
      isLoading={false}
    />);

    expect(wrapper.find(NewTodoForm)).to.have.lengthOf(1);

    expect(wrapper.find('h3.title')).to.have.length(2);
    expect(wrapper.find('h3.title').at(0).text().includes('Incompleted:')).to.equal(true);
    expect(wrapper.find('h3.title').at(1).text().includes('Completed:')).to.equal(true);

    expect(wrapper.find(TodoListItem)).to.have.lengthOf(4);
    const completedItems = wrapper.find('h3.title.complete ~ *').filterWhere((n) => n.type() === TodoListItem);
    expect(completedItems).to.have.lengthOf(2);
  });

  it('shows loading text while loading', () => {
    const mockOnRemoveTodoCallBack = sinon.stub();
    const mockOnCompleteTodoCallBack = sinon.stub();
    const mockOnCreateNewTodoCallBack = sinon.stub();
    const mockOnLoadTodos = sinon.stub();
    const wrapper = mount(<TodoList
      onCreateNewTodoClicked={mockOnCreateNewTodoCallBack}
      onRemoveTodoClicked={mockOnRemoveTodoCallBack}
      onCompleteTodoClicked={mockOnCompleteTodoCallBack}
      incompletedTodos={[]}
      completedTodos={[]}
      onLoadTodos={mockOnLoadTodos}
      isLoading
    />);

    expect(wrapper.find('div').text()).to.be.equal('Loading todos...');
    expect(wrapper.find(TodoListItem)).to.have.lengthOf(0);
  });
});
