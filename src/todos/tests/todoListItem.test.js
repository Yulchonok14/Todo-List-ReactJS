/* eslint-disable react/jsx-filename-extension */
/* eslint-env mocha */
import chai, { expect } from 'chai';

import React from 'react';
import chaiJestSnapshot from 'chai-jest-snapshot';
import renderer from 'react-test-renderer';
import TodoListItem, { getBorder } from '../TodoListItem';

chai.use(chaiJestSnapshot);

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
