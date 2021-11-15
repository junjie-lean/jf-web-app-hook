/*
 * @Author: junjie.lean
 * @Date: 2020-03-18 11:09:36
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2020-03-24 13:04:09
 */
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { expect } from "chai";

Enzyme.configure({ adapter: new Adapter() });

import Loading from "../../view/page/layout-loading";

import { shallow, mount, render } from "enzyme";

describe("<Loading />", () => {
  test("shallow testing:", () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).to.be.a("object");
  });
});

describe("<Loading />", () => {
  it("render testing:", () => {
    const wrapper = mount(<Loading />);
    expect(wrapper.find(".lean-mask")).to.have.lengthOf(1);
    // expect(wrapper.find("button")).to.have.lengthOf(1);
  });
});
