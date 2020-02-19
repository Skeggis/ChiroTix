import React, { useState, useEffect, Fragment } from 'react'
import {
  Card,
  Input,
  Select,
  Divider,
  Button,
  DatePicker,
  Row,
  Col,
  Slider
} from 'antd'
import 'antd/dist/antd.css';
import './SearchBar.scss'
import axios from 'axios'

import { Collapse } from 'react-collapse'

const { Option } = Select
const { RangePicker } = DatePicker

export default function SearchBar(props) {
  const {
    searchValues,
    setEvents
  } = props


  const [hovering, setHovering] = useState(false)
  const [seeMore, setSeeMore] = useState(false)

  const [searchString, setSearchString] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedCities, setSelectedCities] = useState([])
  const [availableCities, setAvailableCities] = useState([])
  const [selectedOrganizations, setSelectedOrganizations] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedSpeakers, setSelectedSpeakers] = useState([])
  const [selectedPrice, setSelectedPrice] = useState([])
  const [selectedCeCredits, setSelectedCeCredits] = useState([])

  const [searchLoading, setSearchLoading] = useState(false)

  async function handleSearch(event) {
    setSearchLoading(true)
    const result = await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/api/searchEvents`,
      method: 'post',
      data: {
        search: {
          organizations: selectedOrganizations.map(org => parseInt(org.key)),
          countries: selectedCountries.map(count => parseInt(count.key)),
          cities: selectedCities.map(city => parseInt(city.key)),
          tags: selectedTags.map(tag => parseInt(tag.key)),
          speakers: selectedSpeakers.map(sp => parseInt(sp.key)),
          dates: selectedDates.length > 0 ? {
            startDate: selectedDates[0],
            endDate: selectedDates[1]
          } : {},
          price: {
            minPrice: selectedPrice[0],
            maxPrice: selectedPrice[1]
          },
          CECredits: {
            minCECredits: selectedCeCredits[0],
            maxCECredits: selectedCeCredits[1]
          },
          searchString,
          categories: selectedCategories.map(cat => parseInt(cat.key))
        }
      }
    })
    console.log(result)
    setEvents(result.data.events)
    setSearchLoading(false)
  }


  useEffect(() => {
    setAvailableCities(searchValues.cities)
  }, [])

  function handleSeeMore() {
    setSeeMore(prev => !prev)
  }

  function handleCountryChange(value) {//ATH value is a list of countries
    //Clear cities that are not in specified country
    if (selectedCities.length > 0 && value.length !== 0) {
      const newCities = selectedCities.filter(city => {
        const cityId = parseInt(city.key)
        const myCity = searchValues.cities.find(c => c.id === cityId)


        let b = value.some(country => {
          const countryId = parseInt(country.key)
          return countryId === myCity.countryid //todo format in server
        })
        return b

      })

      setSelectedCities(newCities)
    }

    setSelectedCountries(value)
    if (value.length > 0) {
      let myCities = []
      value.map(val => {
        const id = parseInt(val.key, 10)
        const citiesInCountry = searchValues.cities.filter(c => c.countryid === id) //todo format in backend
        myCities = myCities.concat(citiesInCountry)
      })
      setAvailableCities(myCities)
    } else {
      setAvailableCities(searchValues.cities)
    }
  }


  function handleCatChange(value) {
    setSelectedCategories(value)
  }

  function handleCityChange(value) {
    setSelectedCities(value)
  }

  function handleDateChange(date, dateString) {
    setSelectedDates(dateString)
  }

  function handleOrganizationsChange(value) {
    setSelectedOrganizations(value)
  }

  function handleTagsChange(value) {
    setSelectedTags(value)
  }

  function handleSpeakersChange(value) {
    setSelectedSpeakers(value)
  }

  function handlePriceChange(price) {
    setSelectedPrice(price)
  }

  function handleCeCreditsChange(credits) {
    setSelectedCeCredits(credits)
  }

  function handleMouseEnter() {
    setHovering(true)
  }

  function handleMouseLeave() {
    setHovering(false)
  }

  function priceDisplayFormatter(value) {
    return `${value} $`
  }
  return (
    <Fragment>
      <form className='searchBar' onSubmit={handleSearch} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={`searchBar__card ${(seeMore || hovering) ? 'searchBar__card--hovering' : ''}`} >
          <div className={`searchBar__card__input ${(seeMore || hovering)?'searchBar__card__input--hovering':''}`}>
            <Input.Search
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
              size='large'
              enterButton={<Button loading={searchLoading} icon='search' style={{ width: 50, color: `${(hovering || seeMore) ? 'black' : 'white'}` }}></Button>}
              onSearch={handleSearch}

            />
          </div>
          <Collapse isOpened={seeMore || hovering}>
            <div className='searchBar__card__mainFilters'>
              <Row gutter={[16, 16]} style={{ marginTop: 0 }}>
                <Col sm={12} md={5}>
                  <div className='searchBar__card__mainFilters__filter'>
                    <Select
                      style={{ width: '100%' }}
                      placeholder='Category'
                      showSearch
                      mode='multiple'
                      labelInValue
                      value={selectedCategories}
                      onChange={handleCatChange}
                    >
                      {searchValues.categories.map(cat => (
                        <Option key={cat.id} value={`${cat.id}`}>{cat.name}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col sm={12} md={5}>
                  <div className='searchBar__card__mainFilters__filter'>
                    <Select
                      style={{ width: '100%' }}
                      placeholder='Country'
                      mode='multiple'
                      value={selectedCountries}
                      onChange={handleCountryChange}
                      labelInValue
                    >
                      {searchValues.countries.map(country => (
                        <Option value={`${country.id}`}>{country.name}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col sm={12} md={5}>
                  <div className='searchBar__card__mainFilters__filter'>
                    <Select
                      style={{ width: '100%' }}
                      placeholder='City'
                      mode='multiple'
                      labelInValue
                      value={selectedCities}
                      onChange={handleCityChange}
                    >
                      {availableCities.map(city => (
                        <Option value={`${city.id}`}>{city.name}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col sm={12} md={9}>
                  <div className='searchBar__card__mainFilters__filter'>
                    <RangePicker
                      style={{ width: '100%' }}
                      onChange={handleDateChange} />
                  </div>
                </Col>
              </Row>
            </div>
            <Divider style={{ marginTop: 20, marginBottom: 0 }}>
              <Button type='link' onClick={handleSeeMore} >{!seeMore ? ('See more') : ('See less')}</Button>
            </Divider>
            <Collapse isOpened={seeMore}>
              <div style={{ paddingTop: 20, paddingBottom: 10 }}>
                <Row gutter={16} style={{ marginTop: 0 }}>
                  <Col span={8}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder='Organization'
                      mode='multiple'
                      labelInValue
                      value={selectedOrganizations}
                      onChange={handleOrganizationsChange}
                    >
                      {searchValues.organizations.map(org => (
                        <Option value={`${org.id}`}>{org.name}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={8} >
                    <Select
                      style={{ width: '100%' }}
                      placeholder='Tags'
                      mode='multiple'
                      labelInValue
                      value={selectedTags}
                      onChange={handleTagsChange}
                    >
                      {searchValues.tags.map(tag => (
                        <Option key={tag.id} value={`${tag.id}`}>{tag.name}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder='Speakers'
                      mode='multiple'
                      labelInValue
                      value={selectedSpeakers}
                      onChange={handleSpeakersChange}
                    >
                      {searchValues.speakers.map(speaker => (
                        <Option key={speaker.id} value={`${speaker.id}`}>{speaker.name}</Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <h4 style={{ marginBottom: 0 }}>Price:</h4>
                    <Slider
                      range
                      defaultValue={[0, 400]}
                      max={3000}
                      tipFormatter={priceDisplayFormatter}
                      onChange={handlePriceChange}
                    />
                  </Col>
                  <Col span={12}>
                    <h4 style={{ marginBottom: 0 }}>CE Credits:</h4>
                    <Slider
                      range
                      defaultValue={[0, 3]}
                      max={10}
                      onChange={handleCeCreditsChange}
                    />
                  </Col>
                </Row>
              </div>
            </Collapse>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button loading={searchLoading} onClick={handleSearch}>Search</Button>

            </div>
          </Collapse>

        </div>
      </form>


    </Fragment>
  )
}

