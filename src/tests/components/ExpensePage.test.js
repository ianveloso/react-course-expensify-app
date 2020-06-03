import React from 'react';
import { shallow } from 'enzyme';
import ExpensePage from '../../components/ExpensePage';

test('should render Expense Dashboard correctly', () => {
    const wrapper = shallow(<ExpensePage />);
    expect(wrapper).toMatchSnapshot();

    //expect(wrapper.find('h1').text()).toBe('Expensify');
    // const renderer = new ReactShallowRenderer(); 
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot(); 
});