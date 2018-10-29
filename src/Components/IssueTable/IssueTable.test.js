import React from 'React'
import { shallow } from "enzyme";

import IssueTable from './IssueTable.jsx'
import IssueRow from '../IssueRow'

describe('<IssueTable />', () => {
    const wrapper = shallow(<IssueTable />)

    it("it renders rows when issues are present", () => {
      wrapper.setState({issues: [{
          author: {
              login: 'test'
          },
          bodyHTML: '<p>hi</p>',
          title: 'test',
          comments: {
              nodes: [],
          }
      }]})
      expect(wrapper.find(IssueRow).length).toBe(1);
    });

    it("it renders loading when no issues loaded", () => {
      const wrapper = shallow(<IssueTable />)
      wrapper.setState({issues: []})
      expect(wrapper.find('td').first().text()).toBe('Loading....');
    });

    //to do: no IssueRow when loading is present and vice versa
})
