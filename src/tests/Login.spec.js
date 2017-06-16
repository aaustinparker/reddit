
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Login } from '../views/Login';


describe('<Login />', function () {

  it('should have an input for username and password', function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input')).to.have.length(2);
  });

});
