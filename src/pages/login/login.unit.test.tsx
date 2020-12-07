import React from "react";
import {shallow} from "enzyme";
import LoginPage from "./login.component";

it('renders without crashing', () => {
    const wrapper = shallow(<LoginPage/>);
    expect(wrapper.find('.headerTitle').text()).toBe('System Votechain:');
});
