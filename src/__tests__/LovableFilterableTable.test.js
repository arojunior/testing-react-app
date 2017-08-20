import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import LovableFilterableTable from '../LovableFilterableTable'
import { tableSchema } from '../App'

describe('LovableFilterableTable', () => {
  let wrapper
  // ...
  describe('when given empty `items`', () => {
    const items = []

    beforeEach(() => {
      wrapper = shallow(
        <LovableFilterableTable items={items} schema={tableSchema} />
      )
    })

    it('should still render search box', () => {
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('should have no table rows', () => {
      expect(wrapper.find('tbody > tr').exists()).toBe(false)
    })
  })
  
})
