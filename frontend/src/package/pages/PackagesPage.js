import React from 'react'
import Banner from '../../shared/UIElements/Banner'
import PackageCard from '../components/PackageCard'

const PackagesPage = () => {
  return (
    <section className="packages-section"> <Banner />
        <div>
          <PackageCard />
        </div>

    </section>
  )
}

export default PackagesPage