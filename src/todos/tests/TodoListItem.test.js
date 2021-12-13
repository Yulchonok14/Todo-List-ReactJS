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
import TodoListItem, { getBorder } from '../TodoListItem';

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

describe('getBorder', () => {
  it('returns none border if created date is less than 8 days', () => {
    const createdDate = new Date(Date.now() - 86400000 * 3);
    const today = Date.now();
    const actual = getBorder(createdDate, today);
    const expected = 'none';

    expect(actual).be.equal(expected);
  });
  it('returns red border if created date is more than 8 days', () => {
    const createdDate = new Date(Date.now() - 86400000 * 10);
    const today = Date.now();
    const actual = getBorder(createdDate, today);
    const expected = '2px solid red';

    expect(actual).be.equal(expected);
  });
});

describe('TodoListItem', () => {
  it('contains text and two buttons if item is not completed', () => {
    const mockOnCompleteCallBack = sinon.stub();
    const mockOnRemoveCallBack = sinon.stub();
    const mockTodo = {
      id: 1,
      text: 'go to the swimming pool',
      isCompleted: false,
    };
    const wrapper = mount(<TodoListItem
      onCompleteTodoClicked={mockOnCompleteCallBack}
      onRemoveTodoClicked={mockOnRemoveCallBack}
      todo={mockTodo}
    />);

    expect(wrapper.find('h3').text().includes(mockTodo.text)).to.equal(true);

    expect(wrapper.find('button')).to.have.length(2);

    wrapper.find('button').at(0).simulate('click');
    expect(mockOnCompleteCallBack.calledOnce).to.equal(true);
    expect(mockOnCompleteCallBack.calledWith(mockTodo.id)).to.equal(true);
    expect(wrapper.find('button').at(0).text().includes('Mark As Completed')).to.equal(true);

    wrapper.find('button').at(1).simulate('click');
    expect(mockOnRemoveCallBack.calledOnce).to.equal(true);
    expect(mockOnRemoveCallBack.calledWith(mockTodo.id)).to.equal(true);
    expect(wrapper.find('button').at(1).text().includes('Remove')).to.equal(true);
  });

  it('contains one button if item is completed', () => {
    const mockOnCompleteCallBack = sinon.stub();
    const mockOnRemoveCallBack = sinon.stub();
    const mockTodo = {
      id: 1,
      text: 'go to the swimming pool',
      isCompleted: true,
    };
    const wrapper = mount(<TodoListItem
      onCompleteTodoClicked={mockOnCompleteCallBack}
      onRemoveTodoClicked={mockOnRemoveCallBack}
      todo={mockTodo}
    />);

    expect(wrapper.find('button')).to.have.length(1);

    wrapper.find('button').at(0).simulate('click');
    expect(mockOnRemoveCallBack.calledOnce).to.equal(true);
    expect(mockOnRemoveCallBack.calledWith(mockTodo.id)).to.equal(true);
    expect(wrapper.find('button').at(0).text().includes('Remove')).to.equal(true);
  });
});

describe('TodoListItem', () => {
  const todoCompleted = [{
    id: '111',
    text: 'wash dishes',
    isCompleted: true,
    createdAt: Date.now(),
  }];

  it('renders correctly', () => {
    const component = renderer.create(<TodoListItem todo={todoCompleted} />);
    const tree = component.toJSON();

    expect(tree).to.matchSnapshot();
  });
});
