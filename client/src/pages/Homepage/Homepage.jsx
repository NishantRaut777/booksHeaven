import React from 'react'
import Navbar from '../../components/Navbar'
import Navbar2 from '../../components/Navbar2'
import CategoryBooks from '../../components/CategoryBooks'
import BookCategories from '../../components/BookCategories'
import AuthorSection from '../../components/AuthorSection'
import Footer from '../../components/Footer'

const Homepage = () => {
  return (
    <>
        {/* <Navbar /> */}
        <Navbar2 />
        <CategoryBooks />
        <BookCategories />
        <AuthorSection />
        <Footer />
    </>
  )
}

export default Homepage
