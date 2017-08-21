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

  describe('when given some `items`', () => {
    // Presence in this array does not indicate endorsement
    const items = [
      { id: 1, name: 'Bitcoin' },
      { id: 2, name: 'Ethereum' },
      { id: 3, name: 'Litecoin' }
    ]

    beforeEach(() => {
      wrapper = shallow(
        <LovableFilterableTable items={items} schema={tableSchema} />
      )
    })

    it('should render corresponding number of table rows', () => {
      expect(wrapper.find('tbody > tr').length).toEqual(3)
    })

    it('should include the title of each item', () => {
      items.forEach(item => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {item.name}
            </td>
          )
        ).toBe(true)
      })
    })
  })
})
