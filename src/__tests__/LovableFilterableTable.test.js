import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import serializer from 'jest-serializer-enzyme'
import LovableFilterableTable from '../LovableFilterableTable'
import { tableSchema } from '../App'

import fs from 'fs'
import path from 'path'

const SAMPLE_RESPONSE_FILE = path.join(__dirname, '../sample-response.json')

const generateItems = () => {
  const response = fs.readFileSync(SAMPLE_RESPONSE_FILE)
  const json = JSON.parse(response)

  return json.slice(0, 30).map(item => ({
    ...item,
    isLoved: false
  }))
}

describe('LovableFilterableTable', () => {
  expect.addSnapshotSerializer(serializer)

  let wrapper

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

  describe('user enters search query', () => {
    let items

    beforeEach(() => {
      items = generateItems()
      wrapper = shallow(
        <LovableFilterableTable items={items} schema={tableSchema} />
      )

      const searchBox = wrapper.find('input')
      searchBox.simulate('change', { target: { value: 'coin' } })
    })

    it('should render a subset of matching `items`', () => {
      const matching = items.filter(i => i.name.match(/coin/i))

      matching.forEach(match => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {match.name}
            </td>
          )
        ).toBe(true)
      })
    })

    it("should not render the `items` that don't match", () => {
      const notMatching = items.filter(i => !i.name.match(/coin/i))

      notMatching.forEach(match => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {match.name}
            </td>
          )
        ).toBe(false)
      })
    })

    it('testing out snapshots', () => {
      const item = items[0]
      expect(item).toMatchSnapshot()
    })

    it('should render a subset of matching `items`', () => {
      expect(wrapper.find('tbody').first().html()).toMatchSnapshot()
    })

    it('should filter items', () => {
      expect(
        wrapper.find('tbody > tr > .item-name').map(i => i.html())
      ).toMatchSnapshot()
    })
    it('should filter items (with serializer!)', () => {
      expect(wrapper.find('tbody')).toMatchSnapshot()
    })
  })
})
